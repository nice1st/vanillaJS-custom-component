export class MyElement extends HTMLElement {
    static get observedAttributes() {return ['lang']; }
    constructor() {
        super();
        // add shadow root in constructor
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
        <hello-world>hello world</hello-world>
        <style>div { background-color: #82b74b; }</style>
        <div>yey</div>
        `;
        // style 정의 및 div 생성
        this._yey = shadowRoot.querySelector('div');
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        // 여기서 lang이라는 attribute가 추가되면 if문에서 통과된다.
        if (attr == 'lang') {
        let yey;
        switch (newValue) {
            case 'ko':
            yey = '만세!';
            break;
            case 'es':
            yey = 'hooray!';
            break;
            case 'jp':
            yey = '万歳!';
            break;
            default:
            yey = 'yey!';
        }
        this._yey.innerText = yey;
        }
    }
    yell() {
        alert(this._yey.innerText);
    }
}