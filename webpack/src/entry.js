import css from './css/index.css';
import less from './css/black.less';
import scss from './css/index.scss';
import module1 from './module';
import $ from 'jquery';
var json = require('../config.json')

console.log(document.querySelector('body'));
{
    let i = 'ff-is-mi';
    $('body').append("<div style='color: #fff'>'引入jQuery了'</div>")
}
module1();

alert(json.name)