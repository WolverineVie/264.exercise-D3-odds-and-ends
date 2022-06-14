// worldbank methane emmissions (kt of CO2  equivalent per person)
// against CO2 emmission ( kt per person ) kt=kiloton per Region
// green to black -> decrease in renewable energy
// circle increase -> increased urbanization
// input slider -> update the year

var width = 600,
    height = 800;

var displayedYear =  parseInt(document.getElementById("sliderId").value);
var displayedYearDataCo2 = getYearFromObjectArray(displayedYear);


// var co2DataObj;
// var methDataObj;
//
// d3.csv('/data/API_EN.ATM.CO2E.KT_DS2_en_csv_v2_4151102.csv').then(function(data) {
//   co2DataObj = data;
// });
// d3.csv('/data/API_EN.ATM.METH.KT.CE_DS2_en_csv_v2_4157045.csv').then(function(data) {
//   methDataObj = data;
// });

var dataAll =[];

Promise.all([
    d3.csv('/data/API_EN.ATM.CO2E.KT_DS2_en_csv_v2_4151102.csv'),
    d3.csv('/data/API_EN.ATM.METH.KT.CE_DS2_en_csv_v2_4157045.csv'),
]).then(function(files) {
    dataAll.push(files[0])// files[0] will contain file1.csv -> co2DataObj
    dataAll.push(files[1]) // files[1] will contain file2.csv -> methDataObj
}).catch(function(err) {
    // handle error here
})

var maxCo2 = getMaxOfObjArr(dataAll[0]); // 34 036 864.4360507
var maxMeth = getMaxOfObjArr(dataAll[1]); // 8 174 420

var svg = d3.select('svg')
            .attr('width',width)
            .attr('height',height);

// X axis
const x = d3.scaleLinear()
  .domain([0, 35 000 000])
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// Y axis
const y = d3.scaleLinear()
  .domain([0, 10 000 000])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(y));

    // svg
    // .append('g')
    //   .attr('transform','translate('+ width/2 + ','+ height/1.8 + ')')
    //   .classed('chart', true);

    svg.selectAll('circle')
      .data(dataAll)
      .enter()
      .append('circle')
        .attr('cx', d => {})
        .attr('cy',d =>{})
        .attr('r',5)

    svg
    .append("text")
      .classed("title", true)
      .attr("x", width / 2)
      .attr("y", 30)
      .style("font-size", "2em")
      .style("text-anchor", "middle")
      .text('methane against co2 distribution')


function getYearFromObjectArray(value){
  var objArrOnlySelectedYear = co2Data.filter(d => d.key === value);
}


function getMaxOfObjArr(objArr){
  var vals=[];
    for(var i=0;i<objArr.length;i++){
      vals.push(Object.values(objArr[i]))
    }
  var mergedVals = [].concat.apply([], vals);
  var mergedValsOnlyNumbers = mergedVals.map(Number);
  var maxVal =d3.max(mergedValsOnlyNumbers)
  return maxVal
}
