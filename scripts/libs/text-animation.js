//アニメーション付与前の下準備（HTMLを整える）クラス
class TextAnimation {
    constructor(el) {
        this.DOM = {};
        this.DOM.el = el instanceof HTMLElement ? el : document.querySelector(el); //DOMを取得
        this.chars = this.DOM.el.innerHTML.trim().split(""); //テキスト前後の空白を削除し,1文字ずつに分割
        this.DOM.el.innerHTML = this._splitText(); //分割後の各文字に対してspanタグで囲むなどの加工を施しDOMを書き換える
    }
    _splitText() {
        return this.chars.reduce((acc, curr) => {
            curr = curr.replace(/\s+/, '&nbsp;'); //空白を半角スペースとして認識させるための置換処理
            return `${acc}<span class="char">${curr}</span>`; //各文字をspanで囲み、それらを連結して返す
        }, ""); //accの初期値
    }
    animate() {
        this.DOM.el.classList.toggle('inview');
    }
}

//実際にアニメーションを付与するクラス
class TweenTextAnimation extends TextAnimation {
    constructor(el) {
        super(el); //加工済みのhtmlがthis.DOM.elに入る ← 1
        this.DOM.chars = this.DOM.el.querySelectorAll('.char'); //1の子要素をすべて取得
    }
    animate() {
        this.DOM.el.classList.add('inview'); //親要素に設定
        this.DOM.chars.forEach((c, i) => {   //子要素に設定
            gsap.to(c, .6, {     //かかる時間
                ease: Back.easeOut,
                delay: i * .05,  //遅延時間
                startAt: { y: '-50%', opacity: 0}, //before
                y: '0%', opacity: 1                //after
            });
        });
    }
}
