//申请人姓名验证
let userName=$('.cell_input input[name=username]')
let userTel=$('.cell_input input[name=tel]')
userName.on('change', function () {
	let myreg = /^[\u0391-\uFFE5]+$/;
	let value = $(this).val()
	if (value.length <= 4 && value.length > 1 && myreg.test(value)) {
		$(this).siblings('.warn_info').html('')
	} else {
		$(this).siblings('.warn_info').html('请输入正确的姓名(2-4汉字)')
	}
})
//申请人手机号验证
userTel.on('change', function () {
	let myreg = /\d{11}/;
	let value = $(this).val()
	if (myreg.test(value)) {
		$(this).siblings('.warn_info').html('')
	} else {
		$(this).siblings('.warn_info').html('请输入正确的手机号')
	}
})
//上传身份证照片
let selecter = new ImgSlter({color: '#fff'});
let imgDatas = {
	passcard:null,
	passcardback:null,
	run_img1:null,
	run_img2:null,
	run_img3:null,
	run_img4:null,
	run_img5:null,
}//选择的图片对象
let imgName = null
selecter.handler = function (data) {
	imgDatas[imgName] = data.img
	$('[data-name='+imgName+'] img:eq(0)').attr('src',data.img)
}
$('.img_wrap').on('click', function () {
	selecter.select()
	imgName = $(this).data('name')
})

$('.submit_btn').on('click',function () {

	if(userName.val()===''){
		Utils.showTip('请输入姓名')
		return
	}
	if(userTel.val()===''){
		Utils.showTip('请输入手机号')
		return
	}

	if($('[name=car_num]').val()===''){
		Utils.showTip('请输入车牌号')
		return
	}
	if($('.warn_info').html()!==''){
		Utils.showTip('请检查是否输入正确')
		return
	}
	let formData={
		username:userName.val(),
		phone:userTel.val(),
		images:[imgDatas['passcard'],imgDatas['passcardback'],imgDatas['run_img1'],imgDatas['run_img2'],imgDatas['run_img3'],imgDatas['run_img4'],imgDatas['run_img5']],
		license_plate_color:$('[name=car_color]').val(),
		plate_number:$('[name=car_num]').val(),
	}
	console.log(formData)
	let images=[imgDatas['passcard'],imgDatas['passcardback'],imgDatas['run_img1'],imgDatas['run_img2'],imgDatas['run_img3'],imgDatas['run_img4'],imgDatas['run_img5']]

	if(images[0]===null){
		Utils.showTip('请选择身份证正面')
		return
	}
	if(images[1]===null){
		Utils.showTip('请选择身份证背面')
		return
	}
	if(images[2]===null){
		Utils.showTip('请选择行驶证正本')
		return
	}
	if(images[3]===null){
		Utils.showTip('请选择行驶证副本')
		return
	}
	if(images[4]===null){
		Utils.showTip('请选择行驶证副本反面')
		return
	}
	if(images[5]===null){
		Utils.showTip('请选择营运证')
		return
	}
	if(images[6]===null){
		Utils.showTip('挂靠公司营业执照')
		return
	}

	$.ajax({
		url:'http://truckservice.applinzi.com/etc/api/upload.php',
		dataType:'json',
		type:'post',
		data:formData,
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

