const template = document.createElement("template");
template.innerHTML = `
    <style>
        div#map { width: 100%; height: 100%; }
    </style>
    
    <div id="map"></div>
`

export class KakaoMap extends HTMLDivElement {
    // 요소의 인스턴스가 생성되거나 업그레이드된 경우. 초기화 단계, 이벤트 리스너 설정 또는 Shadow DOM 생성에 유용합니다.
    constructor() {
        super();
        
        // add shadow root in constructor
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
        const container = this.shadowRoot.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(this.getAttribute("lat") || 37.424701, this.getAttribute("lng") || 126.74767), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        }

        this._map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        
        const resizeObserver = new ResizeObserver(entries => {
            // 리사이즈
            const latlng = this._map.getCenter();
            this._map.relayout();
            this._map.setCenter(latlng);
        });

        resizeObserver.observe(this);

    }
    
    debugMode() {
        kakao.maps.event.addListener(this._map, 'click', function(mouseEvent) {        
            // 클릭한 위도, 경도 정보를 가져옵니다 
            var latlng = mouseEvent.latLng; 
            
            var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
            message += '경도는 ' + latlng.getLng() + ' 입니다';
            console.log(message);
        });

        return this._map;
    }
    
    static get observedAttributes() {
        // 모니터링 할 속성 이름
        // return ['lat', 'lng'];
    }
    
    connectedCallback() {
        // 요소가 DOM에 삽입될 때마다 호출됩니다. 리소스 가져오기나 렌더링과 같이 설정 코드 실행에 유용합니다. 일반적으로, 이 시간까지는 작업을 지연시켜야 합니다.
    }
    
    disconnectedCallback() {
        // 요소가 DOM에서 제거될 때마다 호출됩니다. 정리 코드(이벤트 리스너 제거 등) 실행에 유용합니다.
    }
    
    attributeChangedCallback(attrName, oldVal, newVal) {
        // 속성이 추가, 제거, 업데이트 또는 대체된 경우. 또한, 요소가 파서에 의해 생성되거나 업그레이드된 경우에도 초기 값에 대해 호출됩니다. 
        // 참고: observedAttributes 속성에 나열된 특성만 이 콜백을 수신합니다.
        console.log("attributeChangedCallback");
        switch(attrName) {
            default:
                break;
        }
    }
            
    adoptedCallback(oldDoc, newDoc) {
        // 사용자설정 요소가 새 document(예: document.adoptNode(el)라고도 함)로 이동된 경우
        // 다른 Document에서 옮겨지면 실행되는 method
    }
    
    moveTo(lat, lng) {
        this._map.setCenter(new kakao.maps.LatLng(lat, lng));
    }

    /**
     * @param {Object} markerOption 
     * {
     *  data: {},
     *  position: {
     *      lat: 33, 
     *      lng: 126
     *  },
     * }
     */
    setMarker(markerOption) {
        // 마커가 표시될 위치입니다 
        var markerPosition  = new kakao.maps.LatLng(markerOption.position.lat, markerOption.position.lng); 

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
            , clickable: true
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(this._map);

        // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
        // marker.setMap(null);    

        kakao.maps.event.addListener(marker, 'click', () => {
            // 마커 클릭 이벤트 dispatch
            this.dispatchEvent(new CustomEvent("map-clickMarker", {detail: markerOption.data}));
        });
    }
}