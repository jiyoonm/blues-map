const getDataFromBackend = async() => {
    const rest = await fetch("http://localhost:8000/rooms");
    const data = await rest.json();
    return data;
};

mapboxgl.accessToken = 'pk.eyJ1Ijoiaml5b29ubSIsImEiOiJja2h0dWQ1eHgwdTVuMzRvNWF1YmtyZ3ZoIn0._wCfAXbQt1pdKwXNynE6uw';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: [-73.97829, 40.72509],
    zoom: 10,
    pitch: 0,
    bearing: 0
});

const res = await getDataFromBackend();
console.log(res);

const addData = async() => {
    const data = await getDataFromBackend();
    data.forEach((value) => {
        if (value.address !== "NA") {
            const popup = new mapboxgl.Popup({ offset: 25 }).setText(value.name);
            new mapboxgl.Marker()
                .setLngLat([value.geocode[0], value.geocode[1]])
                .setPopup(popup)
                .addTo(map);

        }
    });
};

addData();