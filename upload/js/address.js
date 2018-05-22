/**
 * Created with ws
 * User: nico
 * Date: 2018-05-22
 * Time: 12:38
 *
 */


var App = function () {
	let userName = $('.cell_input input[name=username]')
	let userTel = $('.cell_input input[name=tel]')
	let address = $('.cell_input input[name=address]')
	var app = {
		//收件人验证
		userCheck: function () {
			userName.on('change', function () {
				let myreg = /^[\u0391-\uFFE5]+$/;
				let value = $(this).val()
				if (value.length <= 4 && value.length > 1 && myreg.test(value)) {
					$(this).siblings('.warn_info').html('')
				} else {
					$(this).siblings('.warn_info').html('请输入正确的姓名(2-4汉字)')
				}
			})
		},
		//联系电话验证
		userTelCheck: function () {

			userTel.on('change', function () {
				let myreg = /\d{11}/;
				let value = $(this).val()
				if (myreg.test(value)) {
					$(this).siblings('.warn_info').html('')
				} else {
					$(this).siblings('.warn_info').html('请输入正确的手机号')
				}
			})
		},
		submitEvent: function () {

			$('.submit').on('click', function () {
				let utils = {
					name: '请输入收件人',
					tel: '请输入手机号',
					area: '请选择地址',
					address: '请输入详细地址'
				}
				let formdata = {
					name: userName.val(),
					tel: userTel.val(),
					area: $('input[name=input_area]').val(),
					address: address.val()
				}
				for (var i in formdata) {
					if (formdata[i] === '') {
						Utils.showTip(utils[i]);
						return
					}
				}
				if ($('.warn_info').html() !== '') {
					Utils.showTip('请检查是否输入正确')
					return
				}
			})
		},
		init:function () {
			this.submitEvent()
			this.userCheck()
			this.userTelCheck()
		}
	}
	app.init()
}()


