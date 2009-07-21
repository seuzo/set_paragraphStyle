/*
ParagaraphStyles_GET.jsx
段落スタイルを取得してテキストに書き出す

2009-06-29	var.0.1	まだおうち使い用
2009-07-05	ver.0.2	選択しているテキストフレームの親ストーリ全体を処理対象とした。http://d.hatena.ne.jp/seuzo/20090710/1247201358
2009-07-21	ver.0.3	段落スタイルグループに対応した。config.txt内の設定段落数よりも適用段落数が多い場合、設定を繰り返すようにした。公開バージョン
*/

////////////////////////////////////////////エラー終了
function my_error(mess) {
	if (mess !== "") {alert (mess)}
	exit();
}

////////////////////////////////////////////paragraphStyleオブジェクトを渡して、グループを含めたフル段落スタイル名を再帰的に得る
function paragraphStyle2str (my_paragraphStyle, str) {
	if (my_paragraphStyle instanceof ParagraphStyle) {//渡されたものがParagraphStyleだったら、その名前をstrに入れる
		str = my_paragraphStyle.name;
	}
	if (my_paragraphStyle.parent instanceof Document) {
		return str ;
	} else if  (my_paragraphStyle.parent instanceof ParagraphStyleGroup) {
		str = my_paragraphStyle.parent.name + "\t" + str;
		return paragraphStyle2str(my_paragraphStyle.parent, str);
	} 
}

////////////////////////////////////////////カレントスクリプトのフルパスを得る 
function get_my_script_path() {
	try {
		return  app.activeScript;
	} catch (myError) {
		return File (myError.fileName);
	}
}

////////////////////////////////////////////データをファイルに書き込む 
function write_file(my_write_file_path, my_data) {
	var my_file_obj = new File(my_write_file_path);
	//if (!(my_file_obj.exists)) {myerror("ファイルがありません\n" + my_write_file_path)};
	if(my_file_obj.open("w")) {
		my_file_obj.write(my_data);
		my_file_obj.close();
	} else {
		myerror("ファイルが開けません\n" + my_write_file_path);
	}
}



////////////////////////////////////////////実行
//選択しているもののチェック
if (app.documents.length === 0) {my_error("ドキュメントが開かれていません");};
var my_doc = app.activeDocument;
if(my_doc.selection.length !== 1){my_error("テキストフレームをひとつ選択してください")};
var my_selection = app.selection[0];
if((my_selection instanceof TextFrame) !== true) {my_error("テキストフレームを選択してください")};

var my_data = "";//書出しデータ
var my_story =my_selection.parentStory ;
for ( var i =0;i< my_story.paragraphs.length; i++) {
	my_data += paragraphStyle2str(my_story.paragraphs[i].appliedParagraphStyle, "") + "\n";
}
var my_ans = confirm ("下記のとおり設定します。実行しますか？\n" + my_data.replace(/\t/g, "::"));
if (my_ans === false) {my_error("")};

var my_activescript_path = get_my_script_path();
var my_activescript_folder = File(my_activescript_path).parent;
var my_config_path = my_activescript_folder + "/config.txt";
write_file(my_config_path, my_data);