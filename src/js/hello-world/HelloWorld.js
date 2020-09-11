export class HelloWorld extends HTMLElement {
    constructor() {
        super();
    }
    static get observedAttributes() {
        // 모니터링 할 속성 이름
    }
    connectedCallback() {
        // DOM에 추가되면 실행되는 method;
        this.innerText = "Hi!";
        this.set();
    }
    disconnectedCallback() {
        // DOM에서 제거면 실행되는 method
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        // 속성이 추가/제거/변경되면 실행되는 method
    }
    adoptedCallback(oldDoc, newDoc) {
        // 다른 Document에서 옮겨지면 실행되는 method
    }
    set() {
		setTimeout(()=> {
			this.innerText = "Hello World";
        }, 2000);
    }
}