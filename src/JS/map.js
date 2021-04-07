;(function(){
let myMap;

const init = () =>{
  myMap = new ymaps.Map("map", {
    center: [59.938951, 30.315635],
    zoom: 12,
    controls: ["zoomControl"]
  })
  const coords =[
    [59.960145, 30.292655],
    [59.930801, 30.347342],
    [59.937126 ,30.323359],
    [59.929788, 30.289328],
  ];

  const myCollection = new ymaps.GeoObjectCollection({},{
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: './img/svg/iconMap.svg',
    iconImageSize: [58, 73],
    iconImageOffset: [-29, -73]
  });

  coords.forEach(coord =>{
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);
})();