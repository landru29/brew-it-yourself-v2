angular.module('brewItYourself').constant('BREWING', {
  ibuComputeCurrentMethod  : 'tinseth', // method to compute IBU
  globalGrainYield         : 90, // global efficiency of the installation for the extraction of sugar
  waterRetentionRate       : 100, // water retention in the grain in percent
  mashingWaterRate         : 300, // rate to compute recommended volume of water for mashing
  residualGravity          : 1.015, // residual gravity after fermentation (used in the alcohol estimation)
  boilingLostRate          : 10
});
