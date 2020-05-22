<script>
export let twat;
let time;
function formatDate (timestamp) {
    let now = new Date();
    let date = new Date(timestamp);
    let deltaDate = now - date;
    if (deltaDate >= 86400 * 1000) {
        const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
    } else if (deltaDate >= 3600 *1000) {
        return `${Math.floor(deltaDate/(3600*1000))}h`
    } else if (deltaDate >= 60*1000){
        return `${Math.floor(deltaDate/(60*1000))}mins`
    } else {
        return `just now`
    }
}
$: time = formatDate(twat.timestamp);
</script>

<style>
	twatCont {
		border: 0.5px solid #ccc;
        padding: 1em;
        display: flex;
        flex-direction:column;
        align-items: flex-start;
        justify-content: center;
	}

    .top {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .name {
        font-weight: bold;
    }
    .id {
        color: #ccc;
    }
    .time {
        flex: 1;
    }
</style>

<twatCont>
    <div class=top>
        <div class=name>{twat.username}</div>
        <div class=id>{twat.userId}</div>
        <div class=time>{time}</div>
    </div>
    <div>{twat.content}</div>
</twatCont>



        <!-- twatId: uuidv4(),
        username,
        userId, 
        timestamp: +new Date(),
        content,
        parentid -->