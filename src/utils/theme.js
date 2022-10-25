import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
let mqMedium = matchMedia("(min-width: 521px) and (max-width: 1024px)");
let mqSmall = matchMedia("(max-width: 520px)");
// let mqOrientation   =  matchMedia("only screen and (max-height: 600px) and (orientation: landscape)");

export function tableActionsTR(e) {
    if (!(mqMedium.matches || mqSmall.matches)) return;

    if (e.target.nodeName === "SELECT") return;
    var td_action = e.currentTarget.getElementsByClassName('action')[0];
    if (td_action.classList.contains('disabled')) return;

    removeOuterButtonWrapper(td_action);
    var buttonWrapperHtml = td_action.getElementsByClassName('button-wrapper')[0].innerHTML;
    let layout_container = document.getElementById('layout-container');

    var node = document.createElement("div");
    node.id = "button-wrapper-outer";
    node.className = "button-wrapper";
    node.innerHTML = buttonWrapperHtml;
    layout_container.appendChild(node);

    let html = document.getElementsByTagName("html")[0];
    html.classList.add('dark');
    !td_action.classList.contains('open') ? td_action.classList.add('open') : td_action.classList.remove('open');

};

export function removeOuterButtonWrapper() {
    let button_wrapper_outer = document.getElementById('button-wrapper-outer');
    if (button_wrapper_outer !== null) {
        let table_wrapper = document.getElementsByClassName('table-wrapper')[0].getElementsByClassName("click")[0];
        table_wrapper.classList.remove('open');
        console.log(button_wrapper_outer.parentNode)
        button_wrapper_outer.parentNode.removeChild(button_wrapper_outer);
        console.log(document.getElementById('layout-container'))
        let html = document.getElementsByTagName("html")[0];
        html.classList.remove('dark');
    }
};

export function tableActions(e) {
    // TODO: fix it - - tableActions
    var self = e.currentTarget;

    if (mqMedium.matches || mqSmall.matches || self.classList.contains('stop')) return;

    if (self.classList.contains('disabled') || e.target.classList.contains('btn')) return;

    // Calculate button-wrapper width
    if (!self.classList.contains('calced')) {
        let btnWrapperWidth = 0;
        let buttonWrapper = self.getElementsByClassName('button-wrapper');
        let btns = buttonWrapper[0].getElementsByClassName('btn');

        Array.from(btns).forEach(function (item) {
            btnWrapperWidth += parseInt(item.clientWidth);
            if (parseInt(item.style.marginRight)) {
                btnWrapperWidth += parseInt(item.style.marginRight);
            }
        });
        buttonWrapper[0].style.width = (btnWrapperWidth + 80) + 'px';

        self.classList.add('calced');
    }

    !self.classList.contains('open') ? self.classList.add('open') : self.classList.remove('open');
}

/**
 *  closeMenu is called when clicking on the dark-cover
 */
export function closeMenu() {
    // TODO - move it and make it more generic + change its name because it is used for both closing menu and button-wrapper
    // We have different approach when closing menu on medium sized devices to small sized devices
    document.getElementsByTagName('html')[0].classList.remove('dark');
    let body = document.getElementsByTagName('body')[0];
    body.classList.contains('screen-med') ? body.classList.add('menu-close') : this.closeMenuSmallScreen();
    this.removeOuterButtonWrapper();
};

/**
 * Gets called to handle notification and account popup visibility when click on the notification/account icon on top header menu.
 */
export function miniMenuToggleBox(event) {
    var li = event.target.closest('li');
    var elements = document.getElementById("mini-menu-wrapper").getElementsByTagName("nav")[0].getElementsByTagName("ul")[0].getElementsByTagName('li');

    // Close others
    for (let i = 0; i < elements.length; i++) {
        if (elements[i] !== li) {
            elements[i].classList.remove('open');
        }
    };

    if (!li.classList.contains('open')) {
        li.classList.add('open');
    } else {
        li.classList.remove('open');
    }
};

/**
 * Function to trigger the collapse of the Show more or Show less button.
 *
 * @param {type} event 
 */
export function rowsViewCollapse(event) {
    var parent = event.target.parentNode;
    var text = parent.childNodes[0];   //first span 
    var arrow = parent.childNodes[1];    //second span

    var fieldset = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('show-more');//get the th parent tag - row

    if (fieldset.length === 0) {
        parent.classList.remove('darkblue');
        parent.style.cursor = 'no-drop';
    } else if (!parent.classList.contains('active')) {
        parent.classList.add('active');
        arrow.classList.remove('down')
        arrow.classList.add('up');
        text.textContent = "Show less";
        fieldset[0].classList.remove('hide');
    } else {
        parent.classList.remove('active');
        arrow.classList.remove('up');
        arrow.classList.add('down')
        text.textContent = "Show more";
        fieldset[0].classList.add('hide');
    }
};

/**
 * Function to trigger the collapse of the Show more or Show less button.
 *
 * @param {type} event 
 * @returns {object} containing the icon to be displayed on the left side of 
 * the fieldset based on its collapsed status.
 */
export function collapsable(event) {
    var fieldset = event.target.parentNode;
    var svg = event.target.children[0];

    if (!fieldset.classList.contains('collapsed')) {
        fieldset.classList.add('collapsed');
        svg.classList.remove('fa-minus-square');
        svg.classList.add('fa-plus-square');
        return { icon: faPlusSquare };
    } else {
        fieldset.classList.remove('collapsed');
        svg.classList.remove('fa-plus-square');
        svg.classList.add('fa-minus-square');
        return { icon: faMinusSquare };
    }
};


/**
 * Function that handles the main menu expand status.
 * @param {type} event 
 * @param {boolean} expanded
 * @returns {object} containing the icon to be displayed on the left side of 
 * the fieldset based on its collapsed status.
 */
export function handleMainMenuExpanded(event, expanded) {
    console.log("hi2")
    let menuNavItems = document.getElementById('menu').getElementsByClassName('rs-nav rs-nav-default rs-sidenav-nav rs-nav-vertical')[0].getElementsByTagName('li');

    if (!document.body.classList.contains('screen-small')) {
        var open = function () {
            document.body.classList.remove('menu-close');
            if (document.body.classList.contains('screen-med')) {
                document.getElementsByTagName('html')[0].classList.add('dark');
            }
            document.getElementById('menu-toggle').classList.remove('active');
        }
        var close = function () {
            document.body.classList.add('menu-close');
            if (document.body.classList.contains('screen-med')) {
                document.getElementsByTagName('html')[0].classList.remove('dark');
            }
            document.getElementById('menu-toggle').classList.add('active');
        }
        document.body.classList.contains('menu-close') ? open() : close();
    } else {
        document.body.classList.add('dark');
        if (!document.body.classList.contains('open-menu')) {
            this.openMenuSmallScreen();
        } else {
            this.closeMenuSmallScreen();
            for (let i = 0; i < menuNavItems.length; i++) {
                if (menuNavItems[i].classList.contains('rs-nav-item')) {
                    if (!expanded) {
                        document.getElementById('menu').getElementsByClassName('rs-nav rs-nav-default rs-sidenav-nav rs-nav-vertical')[0].getElementsByTagName('li')[i].getElementsByTagName('a')[0].style.height = "40px";
                    }
                }
            }
        }
    }

    // Hide footer on sidenav if mini-closed
    if (expanded) {
        document.getElementById('footer-wrapper').className = "";
        return true;
    } else {
        document.getElementById('footer-wrapper').classList.add("hidden");
        return false;
    }
}

export function getTheme() {
    return localStorage.getItem('theme');
}

export default class functions {
    static tableActions(e) { tableActions(e); }
    static tableActionsTR(e) { tableActionsTR(e); }
    static removeOuterButtonWrapper() { removeOuterButtonWrapper(); }
    static closeMenu() { closeMenu(); }
    static miniMenuToggleBox() { miniMenuToggleBox(); }
    static rowsViewCollapse(e) { rowsViewCollapse(e); }
    static collapsable(e) { collapsable(e); }
    static handleMainMenuExpanded(e, expanded) { handleMainMenuExpanded(e, expanded); }
    static getTheme() { getTheme(); }
}