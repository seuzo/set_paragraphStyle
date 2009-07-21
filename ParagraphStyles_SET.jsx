/*
ParagaraphStyles_SET.jsx
テキストから段落スタイルを取得して適用する

2009-06-29	var.0.1	まだおうち使い用
2009-07-05	ver.0.2	選択しているテキストフレームの親ストーリ全体を処理対象とした。http://d.hatena.ne.jp/seuzo/20090710/1247201358
2009-07-21	ver.0.3	段落スタイルグループに対応した。config.txt内の設定段落数よりも適用段落数が多い場合、設定を繰り返すようにした。公開バージョン
*/

////////////////////////////////////////////エラー終了
function my_error(mess) {
	if (mess !== "") {alert (mess)}
	exit();
}


////////////////////////////////////////////カレントスクリプトのフルパスを得る 
function get_my_script_path() {
	try {
		return  app.activeScript;
	} catch (myError) {
		return File (myError.fileName);
	}
}

////////////////////////////////////////////ファイルの内容を読み込んで返す 
function read_file(my_read_file_path) {
	var my_file_obj = new File(my_read_file_path);
	if (!(my_file_obj.exists)) {myerror("ファイルがありません\n" + my_read_file_path)};
	if(my_file_obj.open("r")) {
		var tmp_str = my_file_obj.read();
		my_file_obj.close();
	} else {
		myerror("ファイルが開けません\n" + my_read_file_path);
	}
	return tmp_str;
}


////////////////////////////////////////////実行
//選択しているもののチェック
if (app.documents.length === 0) {my_error("ドキュメントが開かれていません");};
var my_doc = app.activeDocument;
if(my_doc.selection.length === 0){my_error("テキストフレームを選択してください")};
var my_selection = app.selection;
for (var i = 0;i < my_selection.length;i++) {
	if((my_selection[i] instanceof TextFrame) !== true) {my_error("テキストフレームを選択してください")};
}

//データの読み出し
var my_activescript_path = get_my_script_path();
var my_activescript_folder = File(my_activescript_path).parent;
var my_config_path = my_activescript_folder + "/config.txt";
var my_data = read_file(my_config_path);
my_data = my_data.replace(/[\n\r\s]+$/, "");
var my_ans = confirm ("下記のとおり設定します。実行しますか？\n" + my_data.replace(/\t/g, "::"));
if (my_ans === false) {my_error("")};

//段落スタイル用データのオブジェクト復元と検証
var my_data = my_data.split("\n");
for (var i = 0; i < my_data.length; i++) {
	var tmp_array = my_data[i].split("\t");
	var tmp_paragraphStyle = app.activeDocument;
	for (var ii = 0; ii < tmp_array.length; ii++) {
		if ( ii === (tmp_array.length - 1) ) {//段落スタイル名
			var tmp_obj = tmp_paragraphStyle.paragraphStyles.itemByName(tmp_array[ii]);
			if (tmp_obj.isValid) {//その段落スタイルが存在していれば
				my_data[i] = tmp_obj;
			} else {
				my_error("存在しない段落スタイルが指定されています\n" + tmp_array[ii]);
			}
		} else {//段落スタイルグループ名
			var tmp_obj = tmp_paragraphStyle.paragraphStyleGroups.itemByName(tmp_array[ii]);
			if (tmp_obj.isValid) {//その段落スタイルグループが存在していれば
				tmp_paragraphStyle = tmp_obj;
			} else {
				my_error("存在しない段落スタイルグループが指定されています\n" + tmp_array[ii]);
			}
		}//if
	}//for
}//for
	

//段落スタイルを適用
for (var i = 0;i< my_selection.length;i++){
	var my_story = my_selection[i].parentStory;
	for( var ii = 0;ii< my_story.paragraphs.length;ii++) {
		my_story.paragraphs[ii].appliedParagraphStyle = my_data[(ii % my_data.length)];//my_dataの配列数より適用段落が多い時は、配列内を循環する
	}
}


