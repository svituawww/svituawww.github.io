class URL_DataSet {

    constructor(initial = {}) {
       this.firebaseConfig = this.getFirebaseConfig();
       this.DataSet_RootPath = this.firebaseConfig.URL_RelDatabaseRoot;
       this.Url_identity =  this.firebaseConfig.URL_identity + this.firebaseConfig.apiKey;
       this.UrlRequest = this.firebaseConfig.databaseURL + '/' + this.DataSet_RootPath;
       this.email = this.firebaseConfig.email;
       this.password = this.firebaseConfig.password;
       this.idToken = null;
       this.normalize_null_values();
    }


    getFirebaseConfig() {       
       let GCP_FirebaseConfig = {
            apiKey: "AIzaSyA4vnsOFLaTLd4mMCBNGN1l0s8DJR_vAvo",
            authDomain: "svitua-fd4c7.firebaseapp.com",
            databaseURL: "https://svitua-fd4c7-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "svitua-fd4c7",
            storageBucket: "svitua-fd4c7.firebasestorage.app",
            messagingSenderId: "24562929189",
            appId: "1:24562929189:web:c055ad38e74ddeaf6879cc",
            measurementId: "G-CV40KFS55Z"
       };

       let GCP_AdditionalConst = {
            URL_identity: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`,
            email:"saps1@nukr.net",
            password:"B0u_1hg81apAqw",
            URL_RelDatabaseRoot: 'data_base1'
       };
        GCP_FirebaseConfig['URL_identity'] = GCP_AdditionalConst.URL_identity;
        GCP_FirebaseConfig['email'] = GCP_AdditionalConst.email;
        GCP_FirebaseConfig['password'] = GCP_AdditionalConst.password;
        GCP_FirebaseConfig['URL_RelDatabaseRoot'] = GCP_AdditionalConst.URL_RelDatabaseRoot;
        return GCP_FirebaseConfig;
    }


    normalize_null_values() {
        this.DataSet_Basic = this.DataSet_Basic || '';
        this.Url_identity = this.Url_identity || '';
        this.UrlPost1 = this.UrlPost1 || '';
        this.email = this.email || '';
        this.password = this.password || '';
        this.idToken = this.idToken || '';
    }

    fill_after_sign_in(data) {
        this.idToken = data.idToken || null;
    }
  
    async SignIn_User() {
        const email = this.email;
        const password = this.password;
        const url = this.Url_identity;

        const body = JSON.stringify({ email, password, returnSecureToken: true });

        try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: body
        });
        const data = await response.json();
        if (data.idToken) {
            this.fill_after_sign_in(data);
            return data;
        } else {
            throw new Error('Sign-in failed');
        }
        } catch (error) {
        console.error('Error signing in:', error);
        throw error;
        }
    }


    GetObjForRequest() {
        let ObjRequest = {    
            vobj: null,
            ametod: null,
            addUrl: null,
            CallBackFunction: null
        };
        return ObjRequest;
    }


    async requestData_By_URL_Path(objRequest) {
        let { vobj, ametod, addUrl } = objRequest;
        if (this.idToken == null) {
        throw new Error('Not authenticated: idToken is missing.');
        }    

        let jsn1 = "";
        let post_obj = null;
        if (vobj != null) {
            jsn1 = JSON.stringify(vobj);
            post_obj = {
                method: ametod,
                body: jsn1,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        let aurl = `${this.UrlRequest}/${addUrl}.json?auth=${this.idToken}`;
        //...firebasedatabase.app/data_base1/root_content/tables/0/rows.json?auth=eyJhb.......
        const response = await fetch(aurl, post_obj);
        let vdata = await response.json();
        let CallBackFunction = objRequest.CallBackFunction;
        if (CallBackFunction && typeof CallBackFunction === 'function') {
            await CallBackFunction(vdata, ametod);
        }    
    }

  
}



class GlobalVars {
  constructor(initial = {}) {

    //this.firebaseConfig = this.getFirebaseConfig();    
    this.URL_DS = new URL_DataSet({});

    this.cst = {
      FBSets: null,
      ...(initial.cst || {})
    };
    this.sts = {
      vdata1: null,      
      content_table_name: 'content_table1',
      rows_table_content: [],
      content_tables: [],
      ...(initial.sts || {})
    };


  }

  SignIn_User() {
    return this.URL_DS.SignIn_User();
  }


  SaveToFB_Content_By_Index(IndexContent, var_item_content, content_text) {
    let addurl = "root_content/tables/0/rows"+"/"+IndexContent+"/"+var_item_content;
    let ObjRequest = this.URL_DS.GetObjForRequest();
    ObjRequest.vobj = content_text;
    ObjRequest.ametod = 'PUT';
    ObjRequest.addUrl = addurl;      
    ObjRequest.CallBackFunction = function(vdata, ametod) {        
        let contenttext_fb = vdata;
    };
    gv.URL_DS.requestData_By_URL_Path(ObjRequest);
  }

}

