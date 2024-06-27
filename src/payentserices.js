class ProfileServices {
    client = new Client();
    databases;
    storage;
  
    constructor() {
      this.client.setEndpoint("https://cloud.appwrite.io/v1").setProject("666964f3002b5eb5ba59");
      this.databases = new Databases("66703e22001a04bb8be4");
      
    }
  
    async createpayment({
        slug,
        amount,
        userid,
        resid,
        paymentdetails,
        
    }) {
      try {
        return await this.databases.createDocument(
          conf.databaseid,
            "667c7a2f00008423a141",
          slug,
          {
            slug,
            amount,
            userid,
            resid,
            paymentdetails,
            
        
            
          }
        );
      } catch (error) {
        console.log("Appwrite service :: createProfile :: error", error);
        throw error;
      }
    }
   
  
  
  }
  
  const profileService = new ProfileServices();
  export default profileService;
  