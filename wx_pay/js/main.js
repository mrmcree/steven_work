var Main = (function() {
	var main = {
		btn_select: function() {
			$('.choice_list').on('click', '.choice_item', function() {
                var price='￥'+$(this).text().match(/\d+/)[0]*0.99+'元'
                $(this).addClass('is-active').siblings().removeClass('is-active')
                $('.sell').html(price)
			});
		},
		init: function() {
			this.btn_select();
		},
	};
	main.init();
	return main;
})();
