<script>
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import Sidebar from "../../components/Sidebar.svelte";
	if(browser && localStorage.getItem('role')==="USER"){
		goto('/')
	}
</script>
<div class="flex">
	<Sidebar/>
	<slot></slot>
</div>