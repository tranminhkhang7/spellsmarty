import React from 'react';

const GridItem = ({ imageSrc, authorName, authorAvatar, title }) => {
  return (
    <div className="flex flex-col">
      <img src={imageSrc} alt="Image" className="w-full h-auto rounded-xl" />
      <div className="flex items-center">
        <div className="mt-2">
          <img src={authorAvatar} alt="Avatar" className="w-20 h-20 rounded-full" />
        </div>
        <div className="mt-2 ml-4 sm:ml-10 flex flex-col items-start">
          <h3 className="text-gray-800 text-lg font-semibold">{title}</h3>
          <h3 className="text-gray-700 text-lg">{authorName}</h3>
        </div>
      </div>
    </div>
  );
};

const HomeVideos = () => {
  return (
    <>
      <h2
        style={{
          marginLeft: '60px',
          marginTop: '19.92px',
          marginBottom: '19.92px',
          color: '#2C2C2C',
          fontWeight: 'bold',
          fontSize: '26px',
        }}
      >
        Browse
      </h2>
      <div class="image-grid relative">
        <div class="grid-item">
          <div class="grid-item-content">
            <div class="grid-image">
              <img src="https://static.skillshare.com/uploads/users/tmp/67305fda" alt="Image 1" />
            </div>
            <div class="grid-title">
              <div class="circular-image">
                <img src="https://static.skillshare.com/uploads/users/tmp/67305fda" alt="Image 1" />
              </div>
              <div className="title">
                <div className="title-video">
                  How being a nomad changes my entire life forever, like, ever
                </div>
                <div className="creator">David Godman</div>
                <div className="views">47K writes · 1 years ago</div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid-item">
          <div class="grid-item-content">
            <div class="grid-image">
              <img
                src="https://static.skillshare.com/uploads/video/thumbnails/41dad68d5836f509b9d1dd7201d0db7c/original"
                alt="Image 1"
              />
            </div>
            <div class="grid-title">
              <div class="circular-image">
                <img src="https://static.skillshare.com/uploads/users/tmp/67305fda" alt="Image 1" />
              </div>
              <div className="title">
                <div className="title-video">
                  How being a nomad changes my entire life forever, like, ever
                </div>
                <div className="creator">David Godman</div>
                <div className="views">47K writes · 1 years ago</div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid-item">
          <div class="grid-item-content">
            <div class="grid-image">
              <img
                src="https://hardrockmedia.org/wp-content/uploads/2022/11/Hardrockmedia.org_-51.png"
                alt="Image 1"
              />
            </div>
            <div class="grid-title">
              <div class="circular-image">
                <img src="https://static.skillshare.com/uploads/users/tmp/67305fda" alt="Image 1" />
              </div>
              <div className="title">
                <div className="title-video">
                  How being a nomad changes my entire life forever, like, ever
                </div>
                <div className="creator">David Godman</div>
                <div className="views">47K writes · 1 years ago</div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid-item">
          <div class="grid-item-content">
            <div class="grid-image">
              <img
                src="https://photoresources.wtatennis.com/photo-resources/2019/10/08/16313740-f4f5-4d76-bb46-10048e3a74fc/UUdKdWvR.jpg?width=1200&height=630"
                alt="Image 1"
              />
            </div>
            <div class="grid-title">
              <div class="circular-image">
                <img
                  src="https://pbs.twimg.com/profile_images/1526795887120351233/h8sSvL-W_400x400.jpg"
                  alt="Image 1"
                />
              </div>
              <div className="title">
                <div className="title-video">
                  How being a nomad changes my entire life forever, like, ever
                </div>
                <div className="creator">David Godman</div>
                <div className="views">47K writes · 1 years ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="button-container">
        <button class="button hover:bg-red-300">SEE MORE</button>
      </div>
    </>
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    //   <GridItem
    //     imageSrc="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
    //     authorName="John Doe"
    //     title="TRUE Limits Of Humanity – The Final Border We Will Never Cross AAAAAAAAAAAAA"
    //     authorAvatar="https://www.w3schools.com/howto/img_avatar2.png"
    //   />
    //   <GridItem
    //     imageSrc="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
    //     authorName="Jane Smith"
    //     title="TRUE Limits Of Humanity – The Final Border We Will Never Cross"
    //     authorAvatar="https://www.w3schools.com/howto/img_avatar2.png"
    //   />
    //   <GridItem
    //     imageSrc="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
    //     authorName="Robert Johnson"
    //     title="TRUE Limits Of Humanity – The Final Border We Will Never Cross"
    //     authorAvatar="https://www.w3schools.com/howto/img_avatar2.png"
    //   />
    //   <GridItem
    //     imageSrc="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
    //     authorName="Robert Johnson"
    //     title="TRUE Limits Of Humanity – The Final Border We Will Never Cross"
    //     authorAvatar="https://www.w3schools.com/howto/img_avatar2.png"
    //   />
    // </div>
  );
};

export default HomeVideos;
