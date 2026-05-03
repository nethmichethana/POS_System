$(".content").hide();
$("#dashboard_content").show();

$("#dashboard_tab").click(()=>{
    $(".content").hide();
    $("#dashboard_content").show();
});

$("#customer_tab").click(()=>{
    $(".content").hide();
    $("#customer_content").show();
});

$("#item_tab").click(()=>{
    $(".content").hide();
    $("#item_content").show();
});

$("#order_tab").click(()=>{
    $(".content").hide();
    $("#order_content").show();
});

$('#logout_btn').on('click', function () {
    location.reload();
});

$('.sidebar li').on('click', function () {
    $('.sidebar li').removeClass('active');
    $(this).addClass('active');
});