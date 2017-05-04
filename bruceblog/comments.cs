using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace bruceblog
{
    public class comments
    {
        private static readonly string conStr = @"Data Source=daju;Initial Catalog=bruceblog;Integrated Security=True";
        private int _uid;
        private int _articleid;
        private string _commentcontent;
        private string _pubtime;
        private string _nickname;
        public int Uid
        {
            set { _uid = value; }
            get { return _uid; }
        }
        public int ArticleId
        {
            set { _articleid = value; }
            get { return _articleid; }
        }
        public string CommentContent
        {
            set { _commentcontent = value; }
            get { return _commentcontent; }
        }
        public string PubTime
        {
            set { _pubtime = value; }
            get { return _pubtime; }
        }
        public string NickName
        {
            set { _nickname = value; }
            get { return _nickname; }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="articleId"></param>
        /// <param name="commentContent"></param>
        /// <param name="pubTime"></param>
        /// <param name="nickName"></param>
        public comments(int uid, int articleId, string commentContent, string pubTime, string nickName)        
        {
            _uid = uid;
            _articleid = articleId;
            _commentcontent = commentContent;
            _pubtime = pubTime;
            _nickname = nickName;
        }
        public comments() { }
        public List<comments> GetAllComments()
        {
            List<comments> coms = new List<comments>();
            SqlConnection con = new SqlConnection(conStr);
            string cmdSelect = "SELECT * FROM comments";
            SqlCommand cmd = new SqlCommand(cmdSelect,con);
            using (con)
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    coms.Add(new comments(
                        reader.GetInt32(0), reader.GetInt32(1), reader.GetString(2), 
                        reader.GetString(3), reader.GetString(4)
                        ));
                }
                con.Close();
                return coms;
            }
        }

        public List<comments> GetCommentsByArticleId(int articleId)
        {
            List<comments> coms = new List<comments>();
            SqlConnection con = new SqlConnection(conStr);
            string cmdSelect = "SELECT * FROM comments WHERE articleid=" + articleId;
            SqlCommand cmd = new SqlCommand(cmdSelect, con);
            using (con)
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    coms.Add(new comments(
                        reader.GetInt32(0), reader.GetInt32(1), reader.GetString(2),
                        reader.GetString(3), reader.GetString(4)
                        ));
                }
                con.Close();
                return coms;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="articleId"></param>
        /// <param name="commentContent"></param>
        /// <param name="pubTime"></param>
        /// <param name="nickName"></param>
        /// <returns></returns>
        public bool AddComment(string articleId, string commentContent, string pubTime, string nickName)
        {
            string cmdInsert = "INSERT INTO comments(articleid,commentcontent,pubtime,nickname) VALUES('" + articleId +
               "','" + commentContent + "','" + pubTime + "','" + nickName + "')";
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
    }
}