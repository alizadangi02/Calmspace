import User from '../models/UserModel.js';
import Post from '../models/PostModel.js';

// Get all therapists
export const getAllTherapists = async (req, res) => {
  try {
    const therapists = await User.find({ role: 'therapist' })
      .select('-password')
      .sort({ createdAt: -1 });
    res.status(200).json(therapists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching therapists', error: error.message });
  }
};

// Verify a therapist
export const verifyTherapist = async (req, res) => {
  try {
    const { therapistId } = req.params;
    const updatedTherapist = await User.findByIdAndUpdate(
      therapistId,
      { isTherapistVerified: true },
      { new: true }
    ).select('-password');

    if (!updatedTherapist) {
      return res.status(404).json({ message: 'Therapist not found' });
    }

    res.status(200).json(updatedTherapist);
  } catch (error) {
    res.status(500).json({ message: 'Error verifying therapist', error: error.message });
  }
};

// Get all posts for admin review
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
};

// Admin middleware to check if user is admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking admin status', error: error.message });
  }
};