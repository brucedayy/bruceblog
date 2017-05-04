using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace bruceblog
{
    public static class BLL
    {
        //业务1:将注册表单数据加入数据库
        public static bool AddSignUpFormDataToUserTable(string phoneNumber, string password, string nickName, string emailAddress)
        {
            users user = new users();
            user.AddUser(phoneNumber, password, nickName, emailAddress);
            return true;
        }

        //业务2：验证登陆信息
        public static bool CheckLoginUser(string phoneNumber,string password)
        {
            users user = new users();
            List<users> lstuser = new List<users>();
            lstuser = user.GetAllUSer();
            foreach (var ur in lstuser)
            {
                if (ur.PhoneNumber == phoneNumber && ur.Password == password)
                    return true;                
            }
            return false;       
        }

        //业务3:发布文章
        public static bool AddBlogArticleToBlogArticleTable(string articletitle, string nickname, 
            string articlecontent, string pubtime)        
        {
            blogarticle barticle = new blogarticle();
            barticle.AddBlogArticle(articletitle, nickname, articlecontent, pubtime);
            return true;
        }

        //业务4:读取动态
        public static string MakeResponseJson()
        {
            comments coms = new comments();           
            blogarticle ble = new blogarticle();
            List<blogarticle> lstble = new List<blogarticle>();
            lstble = ble.GetAllBlogArticle();
            List<DynamicJson> lstdyjson = new List<DynamicJson>();
            foreach (var be in lstble)
            {
                lstdyjson.Add(
                      new DynamicJson(be.ArticleTitle, be.NickName, be.ArticleContent, be.PubTime, 
                      coms.GetCommentsByArticleId(be.ArticleId))
                  );               
            }
            //JavaScriptSerializer jsonSerialize = new JavaScriptSerializer();
            //string jsonStr = jsonSerialize.Serialize(lstdyjson);
            string jsonStr = JsonConvert.SerializeObject(lstdyjson);
            return jsonStr;
        }
    }
}