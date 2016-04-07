
(function(d) {
	/* load original gitweb.js */
	var s = d.createElement("script");
	s.type = "text/javascript";
	s.src = "static/gitweb.js";
	d.body.appendChild(s);

	/* add separators between .page_nav links split by br */
	[].slice.call(d.querySelectorAll(".page_nav a+br")).forEach(function(v) {
		v.parentNode.replaceChild(d.createTextNode(" | "),v)
	});
	
	/* summary */
	var q = {};
	location.search.substring(1).split(";").forEach(function(p) {
		var kv = p.split("=");
		q[kv[0]]=kv[1];
	});
	if (q.p && (!q.a || q.a == "summary")) {
		var x = new XMLHttpRequest();
		x.onreadystatechange = function() {
			if (x.readyState == XMLHttpRequest.DONE && x.status == 200) {
				var target = d.querySelector(".projects_list");
				if (target) {
					var e = new DOMParser().parseFromString(x.response, "text/html");
					[].slice.call(e.getElementsByTagName("a")).forEach(function(a) {
						if (a.host == location.host) {
							a.host = "github.com";
							a.pathname = "/"+q.p+"/blob/master"+a.pathname;
						}
					});
					target.parentNode.insertBefore(e.body.firstChild, target.nextSibling);
				}
			}
		};
		x.open("GET", "https://api.github.com/repos/"+q.p+"/readme", true);
		x.setRequestHeader("Accept", "application/vnd.github.v3.html");
		x.send();
	}
})(document);

