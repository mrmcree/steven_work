/**
 * Created with ws
 * User: nico
 * Date: 2018-05-16
 * Time: 15:26
 *
 */
//	// 判断默认行为是否可以被禁用
//	if (event.cancelable) {
//		// 判断默认行为是否已经被禁用
//		if (!event.defaultPrevented) {
//			event.preventDefault();
//		}
//	}

//省市
let provinces = new Array("京", "沪", "浙", "苏", "粤", "鲁", "晋", "冀",
	"豫", "川", "渝", "辽", "吉", "黑", "皖", "鄂",
	"津", "贵", "云", "桂", "琼", "青", "新", "藏",
	"蒙", "宁", "甘", "陕", "闽", "赣", "湘");
//键盘数组
let keyNums = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
	"Q", "W", "E", "R", "T", "Y", "U", "P",
	"A", "S", "D", "F", "G", "H", "J", "K", "L",
	"Z", "X", "ok", "C", "V", "B", "N", "M");
let nextKey = 0 //当前输入的索引
//显示键盘
$('.car_nums').on('click',function () {
	$('#card_model').show()
	$('.wrap').hide()
	$('#keyboard').show()
	shenfenkeyboard()
})

function shenfenkeyboard() {
	$('#keyboard>.key_list').html('')
	provinces.forEach((value, index) => {
		$('#keyboard>.key_list').append(`<li class="key"><span>${value}</span></li>`)
	})
	$('#keyboard>.key_list').append(`<li class="key_clean"><span>清空</span></li>`)
	$('#keyboard>.key_list').append(`<li class="key_close"><span>关闭</span></li>`)
}
function numkeyboard() {
	$('#keyboard>.key_list').html('')
	keyNums.forEach((value, index) => {
		$('#keyboard>.key_list').append(`<li class="key"><span>${value}</span></li>`)
	})
}
//输入框绑定事件
$('#input_list li').on('touchstart', function (event) {
	nextKey = $(this).index()

	$(this).siblings().children('span').css('border', '1px solid #ccc')
	$(this).children('span').css('border', '1px solid yellowgreen')
	if (nextKey > 0) {
		numkeyboard()
	} else {
		shenfenkeyboard()
	}

	$('#keyboard').show()

})
//键盘绑定事件
$('.key_list').on('touchstart', '.key>span', function (e) {
	e.stopPropagation()
	let value = $(this).text()
	if (nextKey === 1) {
		if (/\d/.test(value)) {
			Utils.showTip('车牌号必须是字母');
			return
		}
	}
	$('#input_list li span').css('border', '1px solid #ccc')
	$('#input_list li').eq(nextKey).children('span').text(value).css('border', '1px solid yellowgreen')
	nextKey++

	numkeyboard()


	//超过7个数字 1秒后关闭
	if (nextKey >6) {

		setTimeout(function () {
			nextKey=0
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
//清楚绑定事件
$('.key_list').on('click', '.key_clean', function (e) {
	e.stopPropagation()
	$('#input_list li span').text()
	nextKey=0
})
//关闭绑定事件
$('.key_list').on('click', '.key_close', function (e) {
	e.stopPropagation()
	$('#keyboard').hide()
})







