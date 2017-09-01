import $ from 'jquery';
import pym from 'pym.js';

const pymChild = new pym.Child();

// Your graphic code goes here
//
// |
// +   +--+        +--+
// |   |  +---+    |  |
// |   |  ||  |    |  |
// +   |  ||  +----+  |
// |   |  ||  ||  ||  |
// |   |  ||  ||  ||  |
// +   |  ||  ||  ||  |
// |   |  ||  ||  ||  |
// |   |  ||  ||  ||  |
// +-------------------------+

// Call this every time you need to resize the iframe, after your
// graphic is drawn, etc.

function buildChart(statuses, data) {
  $.each(statuses, (k, v) => {
    const thisStatus = data.filter(o => o.status === v);
    const thisPercentage = (thisStatus.length / data.length) * 100;
    console.log(v, thisStatus.length);

    if (v === 'No Fuel') {
      $('#no__gas').text(thisStatus.length);
    }
    const barGroup = `<p class='label'>${v}
    <div class='bar__container clearfix'>
    <span class='gas__bar' style='width: ${thisPercentage}%;'></span>
    <span class='gas__count'>${thisStatus.length}</span>
    </div>`;
    $('#chartArea').append(barGroup);
  });

  $('#total__count').text(data.length);

  pymChild.sendHeight();
}


const statuses = ['No Fuel', 'Has Fuel', 'No Power', 'No Power Has Fuel', 'Unknown'];


function formatData(data) {
  const dallasStations = data.filter(o => o.city === 'Dallas');

  $.each(dallasStations, (k, v) => {
    if (statuses.includes(v.status) === false) {
      statuses.push(v.status);
    }
  });

  console.log(dallasStations.length, statuses);
  buildChart(statuses, dallasStations);
}

$.ajax({
  dataType: 'json',
  url: 'js/stations.json',
  success: formatData,
  cache: false
});


pymChild.sendHeight();
