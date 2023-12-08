

const app = Vue.createApp({
  
    data() {
      
      return {
        videos : null, 
        videoUrl : '', 
        query : '', 
        isPopUpActive : false, 
        page : 1
      }
      
      
    }, 
    mounted() {
      
      this.getVideos()
      
    }, 
    methods : {
      
   async getVideos() {
        let url = '';

  this.query
    ? (url = `https://api.pexels.com/videos/search?query=${this.query}&page=${this.page}&per_page=20`)
    : (url = `https://api.pexels.com/videos/popular/?page=${this.page}&per_page=20`);

  try {
    const data = await fetch(url, {
      headers: {
        Authorization: 'zmp68YUumVuBOUrxgPy1RsXiBCdLFo2rcdVYgEuAy3XkRvixS2er3MQE',
      },
    });

    const results = await data.json();
   
    this.videos = results.videos || results; 

    if (this.videos.length > 0 && this.videos[0].video_files.length > 0) {
      this.videoUrl = this.videos[0].video_files[0].link;
    } else {
      console.log('Invalid structure of the results object.');
    }
  } catch (e) {
    console.log('Failed to fetch', e);
  }
},
      
      
      getVideoLink(link) {
        const videoLink = link 
        this.videoUrl = videoLink
        this.isPopUpActive = true 
      }, 
      sendQuery() {
        
        const ref = this.$refs.q 
        const val = ref.value
        this.query = val
        this.getVideos()
      }, 
      closePopUp() {
        this.isPopUpActive = false 
      },
      nextPage() {
        this.page++ 
        this.getVideos();
        window.scrollTo({
          top : 0,
          behavior : 'smooth'
        })
      }, 
      prevPage() {
        
        this.page == 1 ? (this.page) : (this.page--);
        this.getVideos();
        window.scrollTo({
          top : 0,
          behavior : 'smooth'
        })
      }
      
      
      
    }
  
  
  
  
}).mount('#app');















// fetch('https://api.pexels.com/videos/search?query="car"', {
//   headers: {
//     Authorization: 'zmp68YUumVuBOUrxgPy1RsXiBCdLFo2rcdVYgEuAy3XkRvixS2er3MQE'
//   }
// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log(data.videos);
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });
