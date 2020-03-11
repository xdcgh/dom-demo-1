window.dom = {
    create: function (string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();

        return container.content.firstChild;
    },
    after(node, newNode) {
        node.parentNode.insertBefore(newNode, node.nextSibling);
    },
    before(node, newNode) {
        node.parentNode.insertBefore(newNode, node);
    },
    append(parent, node) {
        parent.appendChild(node);
    },
    wrap(node, parent) {
        dom.before(node, parent);
        dom.append(parent, node);
    },
    remove(node) {
        node.parentNode.removeChild(node);

        return node;
    },
    empty(node) {
        const array = [];
        let firstChild = node.firstChild;
        while (firstChild) {
            array.push(dom.remove(firstChild));
            firstChild = node.firstChild;
        }

        return array;
    },
    attr(node, name, value) {
        if (arguments.length === 3) {
            node.setAttribute(name, value);
        } else if (arguments.length == 2) {
            return node.getAttribute(name);
        }
    },
    text(node, string) {
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string;
            } else {
                node.textContent = string;
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText;
            } else {
                return node.textContent;
            }
        }
    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string;
        } else if (arguments.length === 1) {
            return node.innerHTML;
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(div, 'color', 'red')
            node.style[name] = value;
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(div, 'color')
                return node.style[name];
            } else if (name instanceof Object) {
                const object = name;
                for (let key in object) {
                    node.style[key] = object[key];
                }
            }
        }
    },
    // class api封装
    class: {
        add(node, className) {
            node.classList.add(className);
        },
        remove(node, className) {
            node.classList.remove(className);
        },
        has(node, className) {
            return node.classList.contains(className);
        }
    },
    // 事件 api 封装
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn);
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn);
    },

    find(selector, scope) {
        return (scope || document).querySelectorAll(selector);
    },
    parent(node) {
        return node.parentNode;
    },
    children(node) {
        return node.children;
    },
    siblings(node) {
        return Array.from(node.parentNode.children)
            .filter(n => n !== node);
    },
    next(node) {
        let nextSibling = node.nextSibling;
        while (nextSibling && nextSibling.nodeType === 3) {
            nextSibling = nextSibling.nextSibling;
        }

        return nextSibling;
    },
    previous(node) {
        let previousSibling = node.previousSibling;
        while (previousSibling && previousSibling.nodeType === 3) {
            previousSibling = previousSibling.previousSibling;
        }

        return previousSibling;
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i]);
        }
    },
    index(node) {
        const list = dom.children(node.parentNode);
        let i = 0;
        for (; i < list.length; i++) {
            if (list[i] === node) {
                break;
            }
        }

        return i;
    }
}