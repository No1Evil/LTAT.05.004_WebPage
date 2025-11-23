<template>
    <div id="mainBody">
        
        <Panel title="First name" side="left" />
        
        <div id="postList">
            <Posts />
        </div>
        
        <Panel title="Second name" side="right">
            <div id="panelContent">
                <button @click="megaRefreshLikes">
                    Refresh likes
                </button>
            </div>
        </Panel>
        
    </div>
</template>

<script setup>
import Posts from "../components/Posts.vue";
import Panel from "../components/Panel.vue";

// Easily reload all the likes like a pro
// Guys.. implement that later :P dunno how do to without backend
const megaRefreshLikes = () => {
    window.location.reload();
};

</script>

<style scoped>
#mainBody {
    display: grid;
    grid-template-columns: 250px 1fr 250px; 
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    gap: 20px;
    padding: 20px 10px;
    
    min-width: 0; 
}

@media (max-width: 1000px) {
    #mainBody {
        grid-template-columns: 200px 1fr;
    }
    #rightPanel {
        display: none;
    }
}

@media (max-width: 768px) {
    #mainBody {
        grid-template-columns: 1fr;
        padding: 10px;
    }

    #leftPanel, #rightPanel {
        display: none;
    }
}

#postList {
    padding: 0;
}
</style>