using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bruceblog
{
    /// <summary>
    /// Summary description for dynamic
    /// </summary>
    public class dynamic : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write(BLL.MakeResponseJson());
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