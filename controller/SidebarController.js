$(".content").removeClass("active").hide();
$("#dashboard_content").addClass("active").show();

// Page title map
const pageTitles = {
    dashboard_tab: "📊 Dashboard",
    customer_tab:  "👥 Guest Management",
    item_tab:      "🍜 Menu Management",
    order_tab:     "🧾 Order Management"
};

function switchTab(tabId, contentId) {
    $(".content").removeClass("active").hide();
    $("#" + contentId).addClass("active").show();

    $(".sidebar li").removeClass("active");
    $("#" + tabId).addClass("active");

    // Update topbar title
    $("#page_title").text(pageTitles[tabId] || "Dashboard");
}

$("#dashboard_tab").click(() => switchTab("dashboard_tab", "dashboard_content"));
$("#customer_tab").click(() => switchTab("customer_tab", "customer_content"));
$("#item_tab").click(() => switchTab("item_tab", "item_content"));
$("#order_tab").click(() => switchTab("order_tab", "order_content"));

$("#logout_btn").on("click", function () {
    location.reload();
});