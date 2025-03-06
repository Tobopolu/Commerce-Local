import * as authService from "../services/auth.service.js";
import * as userDB from "../models/auth.model.js";

export function Login(req,res) {
    userDB.getIdByEmail(req.body.email).then(data=>{
        userDB.getPswdByID(data[0].id_user).then(data2=>{
        const hash = data2[0].password;
        const pwd = req.body.password;

        if(authService.pswCheck(pwd,hash)){
                let token = authService.jwtEncode({email : req.body.email});
                res.json({token});
            }
        else{
            res.status(401).json({error: "Mot de passe incorrect."}); 
        }
        }).catch(e=>{
            res.status(500).json({error: e.message});    
        });;
    }).catch(e=>{
        res.status(401 ).json({error: "Utilisateur inconnu."});    
    });
}

export function Token(req,res) {
    if(authService.checkJwt(req)){
        const userMail = authService.jwtDecode(req.body.token);

        userDB.getIdByEmail(userMail.email).then(data=>{
            userDB.getRoleByID(data[0].id_user).then(data2=>{
                res.json(data2[0]);
            }).catch(e=>{
                res.status(500).json({error:e.message});
            });
        }).catch(e=>{
            res.status(500).json({error:e.message});
        });
    }else{
        res.send(false);
    }
}

export function Signup(req,res) {
    const hash = authService.pswHash(req.body.password);
    let user = {
        fn:req.body.firstname,
        ln:req.body.lastname,
        em:req.body.email,
        pd:hash,
        ph:req.body.phone
    };
    
    userDB.createUser(user).then(data=>{
        res.json(data);
    }).catch(e=>{
        res.status(500).json({error: e.message});    
    });
}

export function updateUser(req,res) {
    console.log({...req.body, ...req.params});
    let hash;
    if(req.body.newpassword){
        hash = authService.pswHash(req.body.newpassword);
    }
    else{
        hash = authService.pswHash(req.body.password);
    }
    let user = {
        idu:req.params.id,
        fn:req.body.firstname,
        ln:req.body.lastname,
        em:req.body.email,
        pd:hash,
        ph:req.body.phone
    };
    userDB.updateUser(user).then(data=>{
        let token = authService.jwtEncode({email : req.body.email});
        
        res.json(token);
    }).catch(e=>{
        res.status(500).json({error: e.message});    
    });
}

export function updateRole(req, res) {
    const ir = req.body.ir;
    const idu = req.params.id;

    if (!idu || !ir) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    userDB.updateRole({ ir, idu })
        .then(data => res.json(data))
        .catch(e => res.status(500).json({ error: e.message }));
}

export function getUserData(req,res){
    const userMail = authService.jwtDecode(req.body.token);
    
    userDB.getIdByEmail(userMail.email).then(data=>{
        userDB.getUserByID(data[0].id_user).then(data2=>{
            res.json(data2[0]);
        }).catch(e=>{
            res.status(500).json({error:e.message});
        });
    }).catch(e=>{
        res.status(500).json({error:e.message});
    });
}

export function getAllUserData(req,res){
    const userMail = authService.jwtDecode(req.body.token);

    userDB.getIdByEmail(userMail.email).then(data=>{
        userDB.getRoleByID(data[0].id_user).then(data2=>{
            if(data2[0].name=="admin"){
                userDB.getAllUserData().then(data3=>{
                    res.json([data3]);
                })
            }
        }).catch(e=>{
            res.status(500).json({error:e.message});
        });
    }).catch(e=>{
        res.status(500).json({error:e.message});
    });
    
}

export function getUserRole(req,res){
    const userMail = authService.jwtDecode(req.body.token);

    userDB.getIdByEmail(userMail.email).then(data=>{
        userDB.getRoleByID(data[0].id_user).then(data2=>{
            res.json(data2[0]);
        }).catch(e=>{
            res.status(500).json({error:e.message});
        });
    }).catch(e=>{
        res.status(500).json({error:e.message});
    });

}


export function getUserId(req,res){
    const userMail = authService.jwtDecode(req.body.token);

    userDB.getIdByEmail(userMail.email).then(data=>{
        res.json(data[0]);
    }).catch(e=>{
        res.status(500).json({error:e.message});
    });

}

export function deleteUser(req,res){
    userDB.deleteUser(req.params.id).then(data=>{
        res.json(data);
    }).catch(e=>{
        res.status(500).json({error: e.message});    
    });
}
