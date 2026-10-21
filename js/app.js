(function () {
  "use strict";

  var pageTitles = {
    dashboard: "لوحة التحكم",
    inventory: "الأصناف والمخزون",
    trips: "الطلعات",
    customers: "العملاء",
    purchases: "المشتريات والموردون",
    expenses: "المصروفات",
    reports: "التقارير والتصفية"
  };
  var navigation = document.querySelector(".navigation");
  var pageTitle = document.getElementById("page-title");
  var pageContent = document.getElementById("page-content");

  function showPage(page) {
    var title = pageTitles[page];
    var activeButton;

    if (!title) {
      return;
    }

    activeButton = navigation.querySelector('[data-page="' + page + '"]');
    navigation.querySelectorAll(".navigation__item").forEach(function (button) {
      button.classList.toggle("is-active", button === activeButton);
      if (button === activeButton) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    pageTitle.textContent = title;

    if (page === "dashboard") {
      renderDashboard();
      return;
    }

    if (page === "inventory") {
      window.PepsiApp.inventoryModule.render(pageContent);
      return;
    }

    if (page === "trips") {
      window.PepsiApp.tripModule.render(pageContent);
      return;
    }

    if (page === "customers") {
      window.PepsiApp.customerModule.render(pageContent);
      return;
    }

    if (page === "purchases") {
      window.PepsiApp.purchaseModule.render(pageContent);
      return;
    }

    if (page === "expenses") {
      window.PepsiApp.expenseModule.render(pageContent);
      return;
    }

    if (page === "reports") {
      window.PepsiApp.reportModule.render(pageContent);
      return;
    }

    pageContent.innerHTML =
      '<section class="section-placeholder" aria-labelledby="placeholder-title">' +
        '<h2 id="placeholder-title">' + title + '</h2>' +
        '<p>هذا القسم ضمن مراحل التنفيذ التالية. لم تُضف إليه وظائف أو بيانات بعد.</p>' +
      '</section>';
  }

  function renderDashboard() {
    var products;
    var productCount;
    var message;

    try {
      products = window.PepsiApp.inventoryService.getProducts();
    } catch (error) {
      pageContent.innerHTML =
        '<section class="empty-state" role="alert"><h2>تعذر تحميل ملخص البيانات</h2><p></p></section>';
      pageContent.querySelector("p").textContent = error.message;
      return;
    }

    productCount = products.length;
    message = productCount === 0
      ? "لم تتم إضافة أصناف أو حركات حتى الآن. لن تُعرض أرقام تقديرية على أنها بيانات فعلية."
      : "عدد الأصناف المسجلة: " + productCount + ". بقية المؤشرات ستظهر بعد تنفيذ أقسام الحركات.";

    pageContent.innerHTML =
      '<section class="welcome-panel" aria-labelledby="welcome-title">' +
        '<div>' +
          '<p class="welcome-panel__eyebrow">مرحبًا بك</p>' +
          '<h2 id="welcome-title">ملخص العمل اليومي</h2>' +
          '<p class="welcome-panel__text">ستظهر مؤشرات النظام هنا من البيانات المسجلة.</p>' +
        '</div>' +
        '<div class="welcome-panel__illustration" aria-hidden="true"><span></span><span></span><span></span></div>' +
      '</section>' +
      '<section class="empty-state" aria-labelledby="empty-title">' +
        '<div class="empty-state__icon" aria-hidden="true">' + (productCount === 0 ? "—" : productCount) + '</div>' +
        '<h2 id="empty-title">' + (productCount === 0 ? "لا توجد بيانات مسجلة بعد" : "ملخص الأصناف المسجلة") + '</h2>' +
        '<p></p>' +
      '</section>';
    pageContent.querySelector(".empty-state p").textContent = message;
  }

  navigation.addEventListener("click", function (event) {
    var button = event.target.closest("[data-page]");
    if (button) {
      showPage(button.getAttribute("data-page"));
    }
  });
}());
