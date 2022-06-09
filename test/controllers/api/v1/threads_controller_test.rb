require "test_helper"

class Api::V1::ThreadsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @api_v1_thread = api_v1_threads(:one)
  end

  test "should get index" do
    get api_v1_threads_url, as: :json
    assert_response :success
  end

  test "should create api_v1_thread" do
    assert_difference("Api::V1::Thread.count") do
      post api_v1_threads_url, params: { api_v1_thread: { title: @api_v1_thread.title } }, as: :json
    end

    assert_response :created
  end

  test "should show api_v1_thread" do
    get api_v1_thread_url(@api_v1_thread), as: :json
    assert_response :success
  end

  test "should update api_v1_thread" do
    patch api_v1_thread_url(@api_v1_thread), params: { api_v1_thread: { title: @api_v1_thread.title } }, as: :json
    assert_response :success
  end

  test "should destroy api_v1_thread" do
    assert_difference("Api::V1::Thread.count", -1) do
      delete api_v1_thread_url(@api_v1_thread), as: :json
    end

    assert_response :no_content
  end
end
