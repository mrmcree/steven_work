/**
 * Created with ws
 * User: nico
 * Date: 2018-05-22
 * Time: 12:38
 *
 */


var App = function () {
	var userName = $('.cell_input input[name=shoujianren]')
	var userTel = $('.cell_input input[name=contacttel]')
	var address = $('.cell_input input[name=address]')
	var app = {
		//收件人验证
		userCheck: function () {
			userName.on('change', function () {
				var myreg = /^[\u0391-\uFFE5]+$/;
				var value = $(this).val()
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
				var myreg = /\d{11}/;
				var value = $(this).val()
				if (myreg.test(value)) {
					$(this).siblings('.warn_info').html('')
				} else {
					$(this).siblings('.warn_info').html('请输入正确的手机号')
				}
			})
		},
		submitEvent: function () {

			$('.submit').on('click', function () {
				var utils = {
					addressee: '请输入收件人',
					mobile: '请输入手机号',
					address: '请选择地址',
					detail_address: '请输入详细地址'
				}
				var formdata = {
					addressee: userName.val(),
					mobile: userTel.val(),
					address: $('input[name=input_area]').val(),
					detail_address: address.val()
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
				var newformdata=$.extend(formdata,form1Data)
				console.log(newformdata)
				$.ajax({
					url:'http://truckservice.applinzi.com/etc/api/upload.php',
					dataType:'json',
					type:'post',
					data:newformdata,
					xhr: function() {
						var xhr = $.ajaxSettings.xhr();
						if (onprogress && xhr.upload) {
							xhr.upload.addEventListener('progress', onprogress, false);
							return xhr;
						}
					},
				}).done(function (res) {
					if(res.code===1){
						location.replace('./res.html?success=true')
						$('#progress').hide()
					}else{
						$('#progress').hide()
						location.replace('./res.html?success=false')
					}
				})
				var per = 0;
				function onprogress(e) {
					per= parseInt(100 * e.loaded / e.total);
					$('#progress').show()
					$('#progress .info').html(per+"%");
				}
			})
		},
		areaInit:function () {
			var area1 = new LArea();
			area1.init({
				'trigger': '#address', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
				'valueTo': '#value1', //选择完毕后id属性输出到该位置
				'keys': {
					id: 'id',
					name: 'name'
				}, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
				'type': 1, //数据源类型
				'data': LAreaData //数据源
			});
			area1.value=[0,1];//控制初始位置，注意：该方法并不会影响到input的value
		},
		init:function () {
			this.areaInit()
			this.submitEvent()
			this.userCheck()
			this.userTelCheck()

		}
	}
	app.init()
}()


