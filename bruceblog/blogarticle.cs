using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace bruceblog
{
    public class blogarticle
    {
        static readonly string conStr = @"Data Source=daju;Initial Catalog=bruceblog;Integrated Security=True";
        private int _articleId;
        private string _articleTitle;
        private string _nickName;
        private string _articleContent;
        private string _pubTime;
        public int ArticleId
        {
            set { _articleId = value; }
            get { return _articleId; }
        }
        public string ArticleTitle
        {
            set { _articleTitle = value; }
            get { return _articleTitle; }
        }
        public string NickName
        {
            set { _nickName = value; }
            get { return _nickName; }
        }
        public string ArticleContent
        {
            set {_articleContent = value; }
            get { return _articleContent; }
        }
        public string PubTime
        {
            set { _pubTime = value; }
            get { return _pubTime; }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="articleId"></param>
        /// <param name="articleTitle"></param>
        /// <param name="nickName"></param>
        /// <param name="articleContent"></param>
        /// <param name="pubTime"></param>
        public blogarticle(int articleId,string articleTitle,string nickName,string articleContent,string pubTime)
        {
            _articleId = articleId;
            _articleTitle = articleTitle;
            _nickName = nickName;
            _articleContent = articleContent;
            _pubTime = pubTime;
        }
        public blogarticle() { }

        public bool AddBlogArticle(string articletitle, string nickname, string articlecontent, string pubtime)
        {
            string cmdInsert = "INSERT INTO blogarticle(articletitle,nickname,articlecontent,pubtime) VALUES('" + articletitle +
               "','" + nickname + "','" + articlecontent + "','" + pubtime + "')";
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand(cmdInsert, con);
                    cmd.ExecuteNonQuery();
                    con.Close();
                    return true;
                }
            }
            catch (SqlException e)
            {
                throw;
            }
        }

        public List<blogarticle> GetAllBlogArticle()
        {
            List<blogarticle> listBlogArticle = new List<blogarticle>();
            string cmdSelect = "SELECT articleid,articletitle,nickname,articlecontent,pubtime FROM blogarticle";
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand(cmdSelect, con);
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        listBlogArticle.Add(new blogarticle(
                            reader.GetInt32(0), reader.GetString(1), reader.GetString(2),
                            reader.GetString(3), reader.GetString(4)
                            ));
                    }
                    con.Close();
                    return listBlogArticle;                
                }
            }
            catch (SqlException e)
            {
                throw;
            }
        }
    }
}