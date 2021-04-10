import { connectToDatabase } from 'utils/connectDb';
import getAuthenticatedUser from 'utils/auth';
import Team from 'models/teams';
import Vault from 'models/vaults';

export default async (req, res) => {
    try{
        await connectToDatabase();
        
        const {jwt, teamName} = req.body;
        const user = await getAuthenticatedUser(jwt);

        const team = await Team.findOne({ name: teamName }).exec();
        
        if(!team){
            return res.status(200).json({Error: 'Team does not exist'});
        }

        /* populate the vaults property */
        const getData = await team.populate('vaults._id').execPopulate();
       
        res.status(200).json({Vault: getData.vaults});
    }catch(error){
        console.log(error);
        res.status(500).json({Error: 'Internal server error!'});
    }
}