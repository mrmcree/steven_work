/**
 * Created with ws
 * User: nico
 * Date: 2018-05-22
 * Time: 15:08
 *
 */
var form1Data={}
var Main=function () {
	var userName=$('.cell_input input[name=username]')
	var userTel=$('.cell_input input[name=tel]')
	var selecter = new ImgSlter({color: '#fff'});
	var imgDatas = {
		passcard:null,
		passcardback:null,
		run_img1:null,
		run_img2:null,
		run_img3:null,
		run_img4:null,
		run_img5:null,
	}//选择的图片对象
	var imgName = null
	var main={
		//申请人姓名验证
		userNameCheck:function () {
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
		//申请人手机号验证
		userTelCheck:function () {

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
		selecterInit:function () {
			selecter.handler = function (data) {
				imgDatas[imgName] = data.img
				$('[data-name='+imgName+'] img:eq(0)').attr('src',data.img)
			}
			$('.img_wrap').on('click', function () {
				selecter.select()
				imgName = $(this).data('name')
			})
		},
		_submitEvent:function () {
			$('.submit_btn').on('click',function () {
				var _utils = {
					username: '请输入姓名',
					phone: '请输入手机号',
					plate_number: '请输入车牌号',
					license_plate_color: '请选择颜色'
				}
				form1Data = {
					username: userName.val(),
					phone: userTel.val(),
					plate_number: $('[name=car_num]').val(),
					license_plate_color: $('[name=car_color]').val()
				}
				for (var i in form1Data) {
					console.log(i,form1Data,form1Data[i])
					if (form1Data[i] === '') {
						Utils.showTip(_utils[i]);
						return
					}
				}
				form1Data['images'] = [imgDatas['passcard'], imgDatas['passcardback'], imgDatas['run_img1'], imgDatas['run_img2'], imgDatas['run_img3'], imgDatas['run_img4'], imgDatas['run_img5']]
				var _imgUtils = [
					'请选择身份证正面',
					'请选择身份证背面',
					'请选择行驶证正本',
					'请选择行驶证副本',
					'请选择行驶证副本反面',
					'请选择营运证',
					'请选择挂靠公司营业执照',
				]
				for (var i = 0; i < form1Data['images'].length; i++) {
					if (form1Data['images'][i] === null) {
						Utils.showTip(_imgUtils[i]);
						return
					}
				}
				if ($('.warn_info').html() !== '') {
					Utils.showTip('请检查是否输入正确')
					return
				}
				$('.wrap').hide()
				$('.wrap2').show()
			})
		},
		init:function () {
			this.userTelCheck()
			this._submitEvent()
			this.selecterInit()
			this.userNameCheck()
		}
	}
	main.init()
}()