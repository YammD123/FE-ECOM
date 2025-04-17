<script>

	import { ChartBar, Home, ListOrdered, Settings, User } from "@lucide/svelte";

</script>
<div class="h-screen border bg-white">
    <div class="p-4 mt-3">
        <ul class="flex flex-col gap-3">
            <li><a href="/dashboard/user"> <User strokeWidth={1}/> </a></li>
            <li><a href="/dashboard/category"> <ChartBar strokeWidth={1}/> </a></li>
            <li><a href="/dashboard/order"> <ListOrdered strokeWidth={1}/> </a></li>
        </ul>
    </div>
    <div class="bottom-4 flex flex-col gap-4 absolute p-4">
        <a href="/"> <Home strokeWidth={1}/> </a>
        <a href="/profile"> <Settings strokeWidth={1}/> </a>
    </div>
</div>