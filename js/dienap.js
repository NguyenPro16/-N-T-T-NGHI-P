//---------------------liên kết với firebase----------------------
const firebaseConfig = {
    apiKey: "AIzaSyBws1ko6w6n8uIQEJRwjLat2KQL9xmMAYM",
    authDomain: "website-to-firebase-ce93c.firebaseapp.com",
    databaseURL: "https://website-to-firebase-ce93c-default-rtdb.firebaseio.com",
    projectId: "website-to-firebase-ce93c",
    storageBucket: "website-to-firebase-ce93c.appspot.com",
    messagingSenderId: "153252597805",
    appId: "1:153252597805:web:22ec3e073e04a3972968a4",
    measurementId: "G-1P2T8YRH2K"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();


//---------------------------------------------------------------------
function getArr(arr, newVal) {
    if (arr.length === 0 && !newVal) return [];
    
    const newArr = [...arr, newVal];
    if (newArr.length > 15) {
        newArr.shift();
    }
    return newArr;
}
function open_sheet() {
    var url = "https://docs.google.com/spreadsheets/d/154zyAhdDfyKneWNOv9_bp5fqNMzZWEHPLjCp-sjHbCk/edit#gid=0";
    var target = "_blank";
    window.open(url, target);   
}
var opts_current = {
    angle: -0.2,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: {
        length: 0.6,
        strokeWidth: 0.04,
        color: '#000000'
    },
    renderTicks: false,
    limitMax: false,
    limitMin: false,
    percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
    strokeColor: '#E0E0E0',
    generateGradient: true
};

var current = document.getElementById('chart-current').getContext('2d');
var chart_current = new Chart(current, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Current',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 3,
            fill: false
        }]
    },
    options: {
        responsive: true,
        animation: {
            duration: 0
        },
        scales: {
            // x: {
            //     type: 'time',
            //     time: {
            //         displayFormats: {
            //             second: 'h:mm:ss a'
            //         }
            //     }
            // },
            y: {
                min: 0,
                max: 400,
                ticks: {
                    stepSize: 50
                }
            }
        }
    }
});

var content_row_current = document.querySelectorAll(".content-row-current");
var time_current = [];
var value_current = [];
var j = 0;
    database.ref("Monitor/Curent/data").on("value", function (snapshot) {
        //----------------------------- Gauge ----------------------------
        var current_out = snapshot.val();
        document.getElementById("current").innerHTML = current_out + " A";    
        
        var target_current = document.getElementById('gauge-current'); // your canvas element
        var ctx = target_current.getContext('2d');
        var gauge_current = new Gauge(target_current).setOptions(opts_current); // create sexy gauge!
        gauge_current.animationSpeed = 32;
    
        gauge_current.maxValue = 400; // set max gauge value
        gauge_current.set(current_out);
        //----------------------------- Chart ----------------------------
        var time = new Date().toLocaleTimeString();
        const data = getArr(chart_voltage.data.datasets[0].data, current);
        const labels = getArr(chart_voltage.data.labels, time);
        chart_current.data.labels = labels
        chart_current.data.datasets[0].data = data
        chart_current.update();
        
        interval = setInterval(() => {
            var time = new Date().toLocaleTimeString();
            const currentVal = chart_voltage.data.datasets[0].data[chart_voltage.data.datasets[0].data.length - 1]
            const data = getArr(chart_voltage.data.datasets[0].data, currentVal)
            const labels = getArr(chart_voltage.data.labels, time)
            chart_current.data.labels = labels
            chart_current.data.datasets[0].data = data
            chart_current.update();
        }, 1000);

        interval = setInterval(() => {
            var time_now = new Date();
            if (j <= 6) {
                time_current[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_current[j] = current_out;
                j++;
            }
            else {
                time_current[0] = time_current[1];
                value_current[0] = value_current[1];
                time_current[1] = time_current[2];
                value_current[1] = value_current[2];
                time_current[2] = time_current[3];
                value_current[2] = value_current[3];
                time_current[3] = time_current[4];
                value_current[3] = value_current[4];
                time_current[4] = time_current[5];
                value_current[4] = value_current[5];
                time_current[5] = time_current[6];
                value_current[5] = value_current[6];
                time_current[6] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_current[6] = current_out;
            }
            content_row_current[2].innerHTML = time_current[0];
            content_row_current[3].innerHTML = value_current[0] + " " + "A";
            content_row_current[4].innerHTML = time_current[1];
            content_row_current[5].innerHTML = value_current[1] + " " + "A";
            content_row_current[6].innerHTML = time_current[2];
            content_row_current[7].innerHTML = value_current[2] + " " + "A";
            content_row_current[8].innerHTML = time_current[3];
            content_row_current[9].innerHTML = value_current[3] + " " + "A";
            content_row_current[10].innerHTML = time_current[4];
            content_row_current[11].innerHTML = value_current[4] + " " + "A";
            content_row_current[12].innerHTML = time_current[5];
            content_row_current[13].innerHTML = value_current[5] + " " + "A";
            content_row_current[14].innerHTML = time_current[6];
            content_row_current[15].innerHTML = value_current[6] + " " + "A";
        }, 1000);
    });

    
    
    
