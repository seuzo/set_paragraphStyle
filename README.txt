ソフト名：set_paragraphStyle 0.3
ライセンス：GNU GPLv3
　　作者：市川せうぞー／(c)2009 Seuzo Ichikawa
動作環境：MacOS X10.5.7、InDesign CS4_J（6.0.3）
開発環境：Mac Pro Quad 3GHz（Intel）、ExtendScript Toolkit
開発言語：JavaScript
圧縮方法：zip
コメント：

**何をするスクリプトか？
任意のテキストフレームから段落スタイルの順序を読み取り、異なるテキストフレームに適用します。同じ段落スタイルがいくつ続いてもOKです。設定よりも適用段落数が多い場合は、設定を何度でも繰り返し適用します。実際の処理には、テキストフレームの親ストーリーの各段落を処理しますので、テキストリンクしているテキストフレームでも適用可能です。
詳細はこちらをご覧ください。
http://d.hatena.ne.jp/seuzo/20090721/1248149138


**同梱ファイル3Files
-README.txt	このファイルです。とにかく最初によんでください。
-ParagraphStyles_GET.jsx	段落スタイルを取得し、設定を記憶するスクリプトです。
-ParagraphStyles_SET.jsx	設定を読み込み、段落スタイルを適用するスクリプトです。
-[config.txt]	自動生成される設定用テキストです。


**動作環境
このスクリプトが正常に動作する環境は以下の通りです。Windows環境でも動作する可能性がありますが、動作確認はしていません。
-MacOS X10.5.7
-InDesign CS4_J（6.0.3）((InDesign CS3では動作しません。なぜならInDesign CS3にはオブジェクトに対するisValidプロパティがないからです。設定ファイルを手で書き換える可能性がないならば、この判定を外すことでおそらくInDesign CS3でも動作するはず。))


**ダウンロード
http://www.seuzo.jp/st/scripts_InDesignCS4/index.html#set_paragraphStyle


**インストール
スクリプト本体（ParagraphStyles_GET.jsxとParagraphStyles_SET.jsx）を
~/Library/Preferences/Adobe InDesign/Version 6.0-J/ja_JP/Scripts/Scripts Panel/
にコピーしてください。エイリアスを入れておくだけでもかまいません。
スクリプトパレットから使用します。


**使用方法
+「ウインドウ」メニューから「スクリプティング」ー「スクリプト」を選択し、スクリプトパレットを出します。
+元となる段落スタイルを含んだテキストフレームをひとつだけ選択します。
+スクリプトパレットから、スクリプト「ParagraphStyles_GET.jsx」をダブルクリックします。
+設定確認ダイアログが出現します。よければOKをクリックしてください。
+適用したいテキストフレームを選択してください（複数可）。
+スクリプトパレットから、スクリプト「ParagraphStyles_SET.jsx」をダブルクリックします。
+設定確認ダイアログが出現します。よければOKをクリックしてください。
+テキストフレームにそれぞれの段落スタイルが適用されたのを確認してください。


**既知の不具合、またはToDo、あるいは仕様
-テキストフレーム中に表組みがあったとしても、表のついてはサポートしていません。



**免責事項
-本アプリケーションはInDesignにおける作業効率支援なのであって、処理結果を保証するものではありません。かならず確認をされることをおすすめします。
-このツールを使用する上でデータの破損などのあらゆる不具合・不利益については一切の責任を負いかねますのでご了解ください。
-このツールはすべてのMacintoshとMac OS上で動作をするという確認をとっていませんし、事実上出来ません。したがって、動作を保証するものではありません。


**ライセンス
GNU GPLv3
http://sourceforge.jp/projects/opensource/wiki/licenses%252FGNU_General_Public_License_version_3.0


**履　歴
2009-06-29	var.0.1	まだおうち使い用
2009-07-05	ver.0.2	選択しているテキストフレームの親ストーリ全体を処理対象とした。http://d.hatena.ne.jp/seuzo/20090710/1247201358
2009-07-21	ver.0.3	段落スタイルグループに対応した。config.txt内の設定段落数よりも適用段落数が多い場合、設定を繰り返すようにした。公開バージョン


市川せうぞー
http://www.seuzo.jp/
