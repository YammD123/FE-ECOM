<script>

	import { Home, Settings, User } from "@lucide/svelte";

</script>
<div class="h-screen  border bg-white">
    <div class="p-4 mt-3">
        <ul class="flex flex-col gap-3">
            <li><a href="/dashboard/user"> <User strokeWidth={1}/> </a></li>
        </ul>
    </div>
    <div class="bottom-4 absolute p-4">
        <Settings strokeWidth={1}/>
    </div>
</div>