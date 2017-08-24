jQuery(function () {
	ymaps.ready(init);
});

function init () {

	var map = new ymaps.Map(
			'map', {
				center: [55.814157, 37.784546],
				zoom: 12
			}
		),
		markerElement = jQuery('#marker'),
		dragger = new ymaps.util.Dragger({
			// Драггер будет автоматически запускаться при нажатии на элемент 'marker'.
			autoStartElement: markerElement[0]
		}),
	// Смещение маркера относительно курсора.
		markerOffset,
		markerPosition;

	var myRoutes = new ymaps.GeoObjectCollection();


	// Создаем метку.
	var placemark = new ymaps.Placemark([55.814157, 37.784546], {

	}, {
		iconImageHref: '../img/map-marker.png',
		iconImageSize: [250, 81],
		iconImageOffset: [-35, -80],
		balloonCloseButton: false,
		// Балун будем открывать и закрывать кликом по иконке метки.
		hideIconOnBalloonOpen: false,
		zIndex: 2000,
		zIndexHover: 2500
	});

	myRoutes.add(placemark);

	map.geoObjects.add(myRoutes);

	map.controls.add('zoomControl');

	dragger.events
		.add('start', onDraggerStart)
		.add('move', onDraggerMove)
		.add('stop', onDraggerEnd);



	function getRoute(coords, address){
		var addr = (address.length > 0) ? address : coords;
		map.panTo(

			addr, {
				/* Опции перемещения:
				 разрешить уменьшать и затем увеличивать зум
				 карты при перемещении между точками
				 */
				flying: true
			}
		)
		ymaps.route([
			addr,
			[55.814157, 37.784546]
		]).then(function (route) {
				map.geoObjects.remove(myRoutes);
				myRoutes.removeAll();
				myRoutes.add(route);
				map.geoObjects.add(myRoutes);



				// Зададим содержание иконок начальной и конечной точкам маршрута.
				// С помощью метода getWayPoints() получаем массив точек маршрута.
				// Массив транзитных точек маршрута можно получить с помощью метода getViaPoints.
				var points = route.getWayPoints(),
					lastPoint = points.getLength() - 1;
				// Задаем стиль метки - иконки будут красного цвета, и
				// их изображения будут растягиваться под контент.
				points.options.set('preset', 'twirl#redStretchyIcon');
				// Задаем контент меток в начальной и конечной точках.
				points.get(0).properties.set('iconContent', 'Точка отправления');
				points.get(lastPoint).properties.set('iconContent', 'Точка прибытия');


			}, function (error) {
				alert('Возникла ошибка: ' + error.message);
			});
	}

	$('.map__button-single_route')
		.on('click', function () {
			var $mStreet = $('#map_street');
			var $mBuilding = $('#map_building');

			if ($mStreet.val() && $mBuilding.val()){
				getRoute([0,0], 'г. Москва, ' + $mStreet.val() + ', ' + $mBuilding.val());
			} else {
				var markerGlobalPosition = map.converter.pageToGlobal(markerPosition);
				var geoPosition = map.options.get('projection').fromGlobalPixels(markerGlobalPosition, map.getZoom())
				getRoute(geoPosition, '');
				markerElement.removeAttr('style');
			}


		});

	map.events.add('actionbegin', function(){
		markerElement.removeAttr('style');
	})

	function onDraggerStart(event) {
		var offset = markerElement.offset(),
			position = event.get('position');
		// Сохраняем смещение маркера относительно точки начала драга.
		markerOffset = [
			position[0] - offset.left,
			position[1] - offset.top
		];
		markerPosition = [
			position[0] - markerOffset[0],
			position[1] - markerOffset[1]
		];

		applyMarkerPosition();
	}

	function onDraggerMove(event) {
		applyDelta(event);
	}

	function onDraggerEnd(event) {
		applyDelta(event);
		markerPosition[0] += markerOffset[0];
		markerPosition[1] += markerOffset[1];
		// Переводим координаты страницы в глобальные пиксельные координаты.
		var markerGlobalPosition = map.converter.pageToGlobal(markerPosition),
		// Получаем центр карты в глобальных пиксельных координатах.
			mapGlobalPixelCenter = map.getGlobalPixelCenter(),
		// Получением размер контейнера карты на странице.
			mapContainerSize = map.container.getSize(),
			mapContainerHalfSize = [mapContainerSize[0] / 2, mapContainerSize[1] / 2],
		// Вычисляем границы карты в глобальных пиксельных координатах.
			mapGlobalPixelBounds = [
				[mapGlobalPixelCenter[0] - mapContainerHalfSize[0], mapGlobalPixelCenter[1] - mapContainerHalfSize[1]],
				[mapGlobalPixelCenter[0] + mapContainerHalfSize[0], mapGlobalPixelCenter[1] + mapContainerHalfSize[1]]
			];
		// Проверяем, что завершение работы драггера произошло в видимой области карты.
		if(containsPoint(mapGlobalPixelBounds, markerGlobalPosition)) {
			// Теперь переводим глобальные пиксельные координаты в геокоординаты с учетом текущего уровня масштабирования карты.
			var geoPosition = map.options.get('projection').fromGlobalPixels(markerGlobalPosition, map.getZoom());
			//alert(geoPosition.join(' '));
			console.log(geoPosition);
		}
	}

	function applyDelta (event) {
		// Поле 'delta' содержит разницу между положениями текущего и предыдущего события драггера.
		var delta = event.get('delta');
		markerPosition[0] += delta[0];
		markerPosition[1] += delta[1];
		applyMarkerPosition();
	}

	function applyMarkerPosition () {
		var cont = markerElement.closest('.map__holder');
		var contoff = cont.offset();
		markerElement.css({
			left: markerPosition[0] - contoff.left,
			top: markerPosition[1] - contoff.top
		});
	}

	function containsPoint (bounds, point) {
		return point[0] >= bounds[0][0] && point[0] <= bounds[1][0] &&
			point[1] >= bounds[0][1] && point[1] <= bounds[1][1];
	}
}