$(function(){
    request('/server/chrome/popup', 'GET', null, true, false, 0, popup_handle);
});

function loading() {
    $('#pipup-event').html('<img width="20px" src="assets/img/loading.gif" />');
}

function popup_handle() {
    $(".switchsmall").bootstrapSwitch();
    $('.switchsmall').on('switchChange.bootstrapSwitch', function (e, data) {
        var data = $('form').serialize();
        var url = $('form').attr('action');
        loading();
        request(url, 'POST', data, true, false, 0, popup_handle);
    });
    $('select').on('change', function(){
        var data = $('form').serialize();
        var url = $('form').attr('action');
        loading();
        request(url, 'POST', data, true, false, 0, popup_handle);
    });
    check_proxy_config();
}
