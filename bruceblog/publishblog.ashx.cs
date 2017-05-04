using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bruceblog
{
    /// <summary>
    /// Summary description for publishblog
    /// </summary>
    public class publishblog : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //context.Response.Write(context.Request.QueryString["arTitle"]
            //    +"---"+context.Request.QueryString["nkName"]+"---"
            //    +context.Request.QueryString["arContent"]+"---"+context.Request.QueryString["pTime"]);
            if (BLL.AddBlogArticleToBlogArticleTable(context.Request.QueryString["arTitle"], context.Request.QueryString["nkName"],
                context.Request.QueryString["arContent"], context.Request.QueryString["pTime"]))
            {
                context.Response.Write("发表成功");
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