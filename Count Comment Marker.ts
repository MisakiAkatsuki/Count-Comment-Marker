/// <reference path="C:/Users/RUI/OneDrive/lib/aftereffects.d.ts/ae.d.ts"/>

(function () {
  const ADBE_MARKER: string = "ADBE Marker";

  const isCompActive = function (comp: CompItem) {
    if (!(comp && comp instanceof CompItem)) {
      return false;
    } else {
      return true;
    }
  }

  const isLayerSelected = function (layers: Layer[]) {
    if (layers.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  const actComp: CompItem = <CompItem>app.project.activeItem;
  if (!isCompActive(actComp)) {
    return 0;
  }

  app.beginUndoGroup("Count Comment Marker");
  let keyNum: number = 0;
  let markerObj: MarkerValue;
  let actMarkerTime: number = 0;

  const selLayers: Layer[] = <Layer[]>actComp.selectedLayers;

  if (!isLayerSelected(selLayers)) {
    if(parseFloat(app.version)<AppVersion.CC2017){
      return 0;
    }

    keyNum = <number>actComp.markerProperty.numKeys;

    if (keyNum == 0) {
      markerObj = new MarkerValue(keyNum + 1);
    } else {
      actMarkerTime = actComp.markerProperty.keyTime(actComp.markerProperty.nearestKeyIndex(actComp.time));
      if (actMarkerTime == actComp.time) {
        markerObj = new MarkerValue(keyNum);
      } else {
        markerObj = new MarkerValue(keyNum + 1);
      }
    }

    actComp.markerProperty.setValueAtTime(actComp.time, markerObj);
    return 0;
  }

  for (let layer of selLayers) {
    keyNum = layer.property(ADBE_MARKER).numKeys;

    if (keyNum == 0) {
      markerObj = new MarkerValue(keyNum + 1);
    } else {
      actMarkerTime = layer.property(ADBE_MARKER).keyTime(layer.property(ADBE_MARKER).nearestKeyIndex(actComp.time));
      if (actMarkerTime == actComp.time) {
        markerObj = new MarkerValue(keyNum);
      } else {
        markerObj = new MarkerValue(keyNum + 1);
      }
    }

    layer.property(ADBE_MARKER).setValueAtTime(actComp.time, markerObj);
  }

  app.endUndoGroup();

}).call(this);
