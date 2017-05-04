using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bruceblog
{
    /// <summary>
    /// Summary description for SessionAdmin
    /// </summary>
    public class SessionAdmin : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World");
            
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