/**
 * Created with ws
 * User: nico
 * Date: 2018-05-21
 * Time: 10:16
 *
 */
class Keyboard{
	constructor(){
		this.provinces=new Array("京", "沪", "浙", "苏", "粤", "鲁", "晋", "冀",
			"豫", "川", "渝", "辽", "吉", "黑", "皖", "鄂",
			"津", "贵", "云", "桂", "琼", "青", "新", "藏",
			"蒙", "宁", "甘", "陕", "闽", "赣", "湘");
		this.keyNums=new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
			"Q", "W", "E", "R", "T", "Y", "U", "P",
			"A", "S", "D", "F", "G", "H", "J", "K", "L",
			"Z", "X", "ok", "C", "V", "B", "N", "M");
		this.nextKey=0
	}
	addShengden(){
		$('#keyboard>.key_list').html('')
		this.provinces.forEach((value, index) => {
			$('#keyboard>.key_list').append(`<li class="key"><span>${value}</span></li>`)
		})
		$('#keyboard>.key_list').append(`<li class="key_clean"><span>清空</span></li>`)
		$('#keyboard>.key_list').append(`<li class="key_close"><span>关闭</span></li>`)
	}
	addNum(){
		$('#keyboard>.key_list').html('')
		this.keyNums.forEach((value, index) => {
			$('#keyboard>.key_list').append(`<li class="key"><span>${value}</span></li>`)
		})
	}
	show(){
		var that=this
		$('.car_nums').on('click',function () {
			$('#card_model').show()
			$('.wrap').hide()
			$('#keyboard').show()
			that.addShengden()
		})
	}
	inputEvent(){
		var that=this
		$('#input_list li').on('touchstart', function (event) {
			that.nextKey = $(this).index()
			console.log(that.nextKey)
			$(this).siblings().children('span').css('border', '1px solid #ccc')
			$(this).children('span').css('border', '1px solid yellowgreen')
			if (that.nextKey > 0) {
				that.addNum()
			} else {
				that.addShengden()
			}

			$('#keyboard').show()

		})
	}
	keyAddEvent(){
		var that=this
		$('.key_list').on('touchstart', '.key>span', function (e) {
			e.stopPropagation()
			let value = $(this).text()
			if (that.nextKey === 1) {
				if (/\d/.test(value)) {
					Utils.showTip('车牌号必须是字母');
					return
				}
			}
			$('#input_list li span').css('border', '1px solid #ccc')
			$('#input_list li').eq(that.nextKey).children('span').text(value).css('border', '1px solid yellowgreen')
			that.nextKey++

			that.addNum()


			//超过7个数字 1秒后关闭
			if (that.nextKey >6) {

				setTimeout(function () {
					that.nextKey=0
					$('#card_model').hide()
					$('.wrap').show()

					let values=''
					$('#input_list li').each((value,index)=>{

						values+=$('#input_list li').eq(value).children('span').text()
					})
					$('.car_nums').val(values)
					return
				},1000)

			}
		})
	}
	cleanEvent(){
		var that=this
		$('.key_list').on('click', '.key_clean', function (e) {
			e.stopPropagation()
			$('#input_list li span').text()
			that.nextKey=0
		})
	}
	closeEvent(){
		$('.key_list').on('click', '.key_close', function (e) {
			e.stopPropagation()
			$('#keyboard').hide()
		})
	}
	init(){

		this.keyAddEvent()
		this.inputEvent()
		this.cleanEvent()
		this.closeEvent()
		this.show()
	}
}
var Keyborad1=new Keyboard()
Keyborad1.init()