var TableLookupWizard=new Class({Binds:["send","show","checked","selected"],initialize:function(a){this.element=a;this.separator_row=document.getElement("#ctrl_"+this.element+" tr.reset, #ctrl_"+this.element+" tr.search");$$(("#ctrl_"+a+" .jserror")).setStyle("display","none");$$(("#ctrl_"+a+" .search")).setStyle("display","table-row");$$(("#ctrl_"+a+" tbody tr")).each(function(c){var b=c.getElement("input[type=checkbox]")?c.getElement("input[type=checkbox]"):c.getElement("input[type=radio]");if(b){b.addEvent("change",function(d){d.target.getParent("tr").hasClass("reset")?d.target.getParent("tr").getAllPrevious().destroy():d.target.getParent("tr").destroy();$(("ctrl_"+a)).send()})}});$(("ctrl_"+a)).set("send",{method:"get",link:"cancel",onSuccess:this.show}).addEvent("keyup",this.send)},send:function(){clearTimeout(this.timer);this.timer=setTimeout(function(){$$(("#ctrl_"+this.element+" .search input.tl_text")).setStyle("background-image","url(system/modules/tablelookupwizard/html/loading.gif)");$(("ctrl_"+this.element)).send((window.location.href+"&tableLookupWizard="+this.element))}.bind(this),300)},show:function(d){var b;try{b=JSON.decode(d);if(b.token){AjaxRequest.updateTokens(b.token)}d=b.content}catch(a){}$$(("#ctrl_"+this.element+" .search input.tl_text")).setStyle("background-image","none");$$(("#ctrl_"+this.element+" tr.found")).each(function(e){e.destroy()});var c=Elements.from(d,false);$$(("#ctrl_"+this.element+" tbody")).adopt(c);c.each(function(e){if(e.getElement("input[type=checkbox]")){e.getElement("input[type=checkbox]").addEvent("click",this.checked)}if(e.getElement("input[type=radio]")){e.getElement("input[type=radio]").addEvent("click",this.selected)}}.bind(this))},checked:function(a){if(a.target.checked){a.target.getParent("tr").removeClass("found").inject($$(("#ctrl_"+this.element+" tr.search"))[0],"before")}else{a.target.getParent("tr").destroy();$(("ctrl_"+this.element)).send()}},selected:function(a){a.target.getParent("tr").removeClass("found").inject(this.separator_row,"before");a.target.getParent("tr").getAllPrevious().destroy();$(("ctrl_"+this.element)).send()}});