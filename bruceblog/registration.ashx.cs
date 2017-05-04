using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bruceblog
{
    /// <summary>
    /// Summary description for registration
    /// </summary>
    public class registration : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //context.Response.Write(context.Request.Form.ToString());  
            if (BLL.AddSignUpFormDataToUserTable(context.Request.Form["phonenum"],
                context.Request.Form["pwd"], context.Request.Form["nname"],
                context.Request.Form["email"]))
                context.Response.Write("注册成功");          
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