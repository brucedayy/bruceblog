using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bruceblog
{
    /// <summary>
    /// Summary description for Login
    /// </summary>
    public class Login : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            if (BLL.CheckLoginUser(context.Request.Form["loginpnum"], context.Request.Form["loginpwd"]))
            {
                users us = new users();
                string nkName=us.GetUserNickNameByPhone(context.Request.Form["loginpnum"]);
                context.Response.Write("yes&"+nkName);
            }
            else
            {
                context.Response.Write("no");
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}