const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");
//  监听窗口滑动事件
window.addEventListener("scroll", () => {
  let height = headerEl.getBoundingClientRect().height;    // 获取所占屏幕空间的矩形区域高度
  // 向下滑动距离超过800
  if (window.pageYOffset - height > 800) {
    if (!headerEl.classList.contains("sticky")) {    // 先判断是否有这个属性，有就不添加，没有就添加
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }
  // 向下滑动超过2000像素 就显示
  if (window.pageYOffset > 2000) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
})

const glide = new Glide(".glide");
const captionsEL = document.querySelectorAll(".slide-caption");
// 获取轮播执行前后 状态值
glide.on(["mount.after", "run.after"], () => {
  const caption = captionsEL[glide.index]; // 返回当前轮播的下标来获取captionsEL对应的标题
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400, // 动画执行时间 执行函数-线性 
    easing: "linear",
    delay: anime.stagger(400, { start: 300 }),
    translateY: [anime.stagger([40, 10]), 0]  // 从下方移动到上方
  });
});
// 轮播前还原透明度为0 这样每次轮播时都有动画效果
glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption > *").forEach(el => {
    el.style.opacity = 0;
  });
});
glide.mount();
// 成功案例 调用isotope.js 添加动画效果
const isotope = new Isotope(".cases", {
  layoutMode: "fitRows",    // 行模式布局，占满一行才到下一行
  itemSelector: ".case-item"    // 指定每个案例的元素
});
// 获取筛选按钮 实例
const filterBtns = document.querySelector(".filter-btns");
// 给筛选按钮的容器设置监听事件
filterBtns.addEventListener("click", e => {
  let { target } = e;   // 获取target
  const filterOption = target.getAttribute("data-filter");   // 获取点击的按钮筛选的类别
  if (filterOption) {
    // 把已经有了 active 属性按钮取消 把点中的按钮加上 active 属性  forEach 取消所有按钮属性
    document
      .querySelectorAll(".filter-btn.active")
      .forEach(btn => btn.classList.remove("active"));
    target.classList.add("active");
    isotope.arrange({ filter: filterOption });    // 把 filterOption 传进去
  }
})
// 定义一个通用的配置项 
const staggeringOption = {
  // 延迟300毫秒出现 从下到上 有50像素的移动 动画执行500毫秒 动画函数
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: "ease-in-out",
  origin: "bottom"
}
// 滑动时动画效果 引入配置项 把所有属性都拿出来 加上一个新的属性 
// 再返回一个新的对象--有6个属性（下一个对象延迟350毫秒出现）// 关于我们 服务流程
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 350 });
ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 350 });
// 数据增长 设置背景视差效果 获取实例  把对象传进来 
const dataSectionEl = document.querySelector(".data-section");
ScrollReveal().reveal(".data-section", {
  // 对属性的内容进行动画 用函数把当前内容传进来 
  // 从0到内部定义好的数字 动画执行时间2秒 按1增长 越来越快的动画效果
  beforeReveal: () => {
    anime({
      targets: ".data-piece .num",
      innerHTML: el => {
        return [0, el.innerHTML];
      },
      duration: 2000,
      round: 1,
      easing: "easeInExpo"
    });
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5}px)`;
  }
});
// 监听window滚动事件
window.addEventListener("scroll", () => {
  // 获取bottom和top 当前容器到浏览器底部和顶部的距离 来判断是否在可见范围内
  const bottom = dataSectionEl.getBoundingClientRect().bottom;
  const top = dataSectionEl.getBoundingClientRect().top;
  // 判断出现 X轴不动 移动Y轴 
  if (bottom >= 0 && top <= window.innerHeight) {
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`;
  }
});
// 初始化scroll实例 传递选择器并对其进行监听 配置固定的导航 并向下滚动多80px
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
  header: "header",
  offset: 80
});
// 添加监听事件 当开始滚动时 全屏导航打开状态 就取消这个状态
document.addEventListener("scrollStart", () => {
  if (headerEl.classList.contains("open")) {
    headerEl.classList.remove("open");
  }
});
// 监听探索更多--关于我们 注册点击事件 利用上面初始化好的scroll 调用函数 把参数传递进来
const exploreBtnEls = document.querySelectorAll(".explore-btn");
exploreBtnEls.forEach(exploreBtnEl => {
  exploreBtnEl.addEventListener("click", () => {
    scroll.animateScroll(document.querySelector("#about-us"));
  });
});
// 折叠按钮 获取实例 添加点击事件
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
})

