/*
  Count Comment Marker
    (C) あかつきみさき(みくちぃP)

  このスクリプトについて
    選択したレイヤーにマーカーの数+1カウントのコメントがついたマーカーを追加するスクリプト.
    例:レイヤーのマーカーの数が3つなら「4」のコメントがついたマーカーを追加

    マーカーが追加される時間に存在する場合はマーカーの数が変わらない為,コメントは元のマーカーの数と同じ数字になります.

  使用方法
    1.ファイル→スクリプト→スクリプトファイルの実行から実行.

  動作環境
    Adobe After Effects CS6以上

  バージョン情報
    2016/10/23 Ver 1.0.0 Release
*/
/// <reference path="C:/Users/RUI/OneDrive/lib/aftereffects.d.ts/ae.d.ts"/>
(function () {
    var ADBE_MARKER = "ADBE Marker";
    var isCompActive = function (comp) {
        if (!(comp && comp instanceof CompItem)) {
            return false;
        }
        else {
            return true;
        }
    };
    var isLayerSelected = function (layers) {
        if (layers.length === 0) {
            return false;
        }
        else {
            return true;
        }
    };
    var actComp = app.project.activeItem;
    if (!isCompActive(actComp)) {
        return 0;
    }
    app.beginUndoGroup("Count Comment Marker");
    var keyNum = 0;
    var markerObj;
    var actMarkerTime = 0;
    var selLayers = actComp.selectedLayers;
    if (!isLayerSelected(selLayers)) {
        keyNum = actComp.markerProperty.numKeys;
        if (keyNum == 0) {
            markerObj = new MarkerValue(keyNum + 1);
        }
        else {
            actMarkerTime = actComp.markerProperty.keyTime(actComp.markerProperty.nearestKeyIndex(actComp.time));
            if (actMarkerTime == actComp.time) {
                markerObj = new MarkerValue(keyNum);
            }
            else {
                markerObj = new MarkerValue(keyNum + 1);
            }
        }
        actComp.markerProperty.setValueAtTime(actComp.time, markerObj);
        return 0;
    }
    for (var _i = 0, selLayers_1 = selLayers; _i < selLayers_1.length; _i++) {
        var layer = selLayers_1[_i];
        keyNum = layer.property(ADBE_MARKER).numKeys;
        if (keyNum == 0) {
            markerObj = new MarkerValue(keyNum + 1);
        }
        else {
            actMarkerTime = layer.property(ADBE_MARKER).keyTime(layer.property(ADBE_MARKER).nearestKeyIndex(actComp.time));
            if (actMarkerTime == actComp.time) {
                markerObj = new MarkerValue(keyNum);
            }
            else {
                markerObj = new MarkerValue(keyNum + 1);
            }
        }
        layer.property(ADBE_MARKER).setValueAtTime(actComp.time, markerObj);
    }
    app.endUndoGroup();
}).call(this);
